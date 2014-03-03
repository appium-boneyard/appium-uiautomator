current_dir = $(shell pwd)
xcode_path:="$(shell xcode-select -print-path | sed s/\\/Contents\\/Developer//g)"

DEFAULT: jshint build

jshint:
	jshint lib

build: 
	cd bootstrap && android create uitest-project -n AppiumBootstrap -t android-18 -p .
	cd bootstrap && ant clean build

.PHONY: \
	DEFAULT \
	jshint \
	build
