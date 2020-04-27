build:
	rush build

gen: build
	cd dev/generator && rushx gen

graph: build
	cd dev/graph && rushx runner