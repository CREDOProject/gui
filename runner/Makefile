VERSION := $(shell git describe --tags --exact-match 2>/dev/null || git rev-parse --short HEAD)
ISLATEST := $(shell if git describe --tags --exact-match >/dev/null 2>&1; then echo "latest"; else echo "${VERSION}"; fi)

.PHONY: build
build:
	docker build . \
		-t credo-builder:$(ISLATEST) \
		-t credo-builder:$(VERSION)
