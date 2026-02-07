# ROADMAP

- [x] Add AI_INSTRUCTIONS.md that explain the link between this client and the OpenAPI specification. That is the source of truth for this repo.
- [x] Pull examples out of README.md add to separate file(s). Make sure the examples are clear and accurate. 
- [ ] Add depreciation warning to endpoints that exist here and not in the OpenAPI specification.
    - [ ] Deprecate (or remove) the CreateDomainRequest class. It is not in the OpenAPI specification. You can get a list of domains and domain details via the GetDomainsRequest and GetDomainRequest classes.
    - [ ] Deprecate (or remove) the DeleteDomainRequest class. It is not in the OpenAPI specification. You can get a list of domains and domain details via the GetDomainsRequest and GetDomainRequest classes.
    - [ ] Deprecate (or remove) all Rule classes. They are not in the OpenAPI specification. You can get a list of domains and domain details via the GetDomainsRequest and GetDomainRequest classes.
- [ ] Add to roadmap the missing endpoints that don't exist here but are in the OpenAPI specification.
- [ ] Add section on building & running tests to README.md
- [ ] Add section on how to publish updates to npm to README.md
