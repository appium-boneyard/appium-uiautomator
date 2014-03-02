current_dir = $(shell pwd)
xcode_path:="$(shell xcode-select -print-path | sed s/\\/Contents\\/Developer//g)"

DEFAULT: clean build

clean: 
	cd bootstrap && ant clean

build: 
	cd bootstrap && ant build

.PHONY: \
	DEFAULT \
	build
