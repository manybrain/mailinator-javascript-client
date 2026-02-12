# ROADMAP

- [x] Add AI_INSTRUCTIONS.md that explain the link between this client and the OpenAPI specification. That is the source of truth for this repo.
- [x] Pull examples out of README.md add to separate file(s). Make sure the examples are clear and accurate. 
- [x] Add section on how to publish updates to npm to README.md
- [x] Add depreciation warning to endpoints that exist here and not in the OpenAPI specification.
- [ ] Add section on building & running tests to README.md

Next Minor Release:
- [ ] Add to the missing endpoints that don't exist here but are in the OpenAPI specification.


Next Major Release:
- [ ] Remove deprecated endpoints that exist here and not in the OpenAPI specification. This includes all Rule endpoints and the CreateDomainRequest and DeleteDomainRequest endpoints.
- [ ] Update README.md and REFERENCE.md to remove deprecated endpoints and note their removal. This is a breaking change, so it should be part of a major release.
