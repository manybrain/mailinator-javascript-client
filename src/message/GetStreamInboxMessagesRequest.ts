import { Inbox } from './Inbox';
import { Request } from '../Request';
import { IHeaders } from 'typed-rest-client/Interfaces';
import { IRestResponse } from 'typed-rest-client/RestClient';
import httpClient from '../MailinatorHttpClient';
import { AUTHORIZATION } from '../Constants';
import { StringDecoder } from 'string_decoder';

const _resolveTemplateUrl = (domain: string, inbox: string) => {
    return `https://api.mailinator.com/api/v2/domains/${domain}/stream/${inbox}`;
};

function extractFirstJsonObject(text: string): { jsonStr: string, endIndex: number } | null {
    let inString = false;
    let escape = false;
    let depth = 0;
    let start = -1;

    for (let i = 0; i < text.length; i++) {
        const ch = text[i];

        if (start === -1) {
            if (ch === "{") {
                start = i;
                depth = 1;
            }
            continue;
        }

        if (inString) {
            if (escape) escape = false;
            else if (ch === "\\") escape = true;
            else if (ch === "\"") inString = false;
            continue;
        }

        if (ch === "\"") inString = true;
        else if (ch === "{") depth++;
        else if (ch === "}") {
            depth--;
            if (depth === 0) return { jsonStr: text.slice(start, i + 1), endIndex: i + 1 };
        }
    }

    return null;
}

export class GetStreamInboxMessagesRequest implements Request<Inbox> {
    constructor(private readonly domain: string, private readonly inbox: string) {}

    execute(apiToken: string): Promise<IRestResponse<Inbox>> {
        const _options: IHeaders = {
            [AUTHORIZATION]: apiToken,
            'Accept': 'application/json',
            'Accept-Encoding': 'identity',
            'Connection': 'keep-alive'
        };

        return new Promise((resolve, reject) => {
            httpClient.get(_resolveTemplateUrl(this.domain, this.inbox), _options).then(res => {
                if (res.message.statusCode !== 200) {
                    res.message.destroy();
                    reject(new Error(`API returned HTTP ${res.message.statusCode}: Stream failed to open`));
                    return;
                }

                const decoder = new StringDecoder('utf8');
                let buffer = '';

                res.message.on('data', (chunk) => {
                    buffer += decoder.write(chunk);

                    let extraction;
                    while ((extraction = extractFirstJsonObject(buffer)) !== null) {
                        const { jsonStr, endIndex } = extraction;
                        buffer = buffer.slice(endIndex);

                        try {
                            const parsed = JSON.parse(jsonStr);

                            if (parsed && typeof parsed === 'object' && 'ping' in parsed) {
                                continue;
                            }

                            let result: any = parsed;
                            if (parsed && typeof parsed === 'object' && !Array.isArray(parsed) && !('msgs' in parsed) && ('id' in parsed)) {
                                result = { domain: parsed.domain, to: parsed.to, msgs: [parsed] };
                            }

                            res.message.destroy();
                            resolve({
                                statusCode: res.message.statusCode || 200,
                                result: result as Inbox,
                                headers: res.message.headers
                            });
                            return;
                        } catch (e) {
                            // ignore and keep extracting
                        }
                    }
                });

                res.message.on('error', reject);
                res.message.on('end', () => reject(new Error('Stream ended without message')));
            }).catch(reject);
        });
    }
}
