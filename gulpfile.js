let gulp = require("gulp");
let PluginError = require("plugin-error");
let log = require("fancy-log");
let webpack = require("webpack");
const { spawn } = require("child_process");
const path = require("path");

let setProduction = done => {
	process.env.NODE_ENV = "production";
	done();
};

let setDev = done => {
	process.env.NODE_ENV = "development";
	done();
};

/** For inclusion in web pages */
function webpackOnBuild(done) {
	let start = Date.now();
	return function(err, stats) {
		if (err) {
			throw new PluginError("webpack", err);
		}
		log(
			"[webpack]",
			stats.toString({
				colors: true
			})
		);
		let end = Date.now();
		log("Build Completed, running for " + (end - start) / 1000) + "s";
		if (done) {
			done(err);
		}
	};
}

/** For external/built projects to import via NPM */
function doBuildESModules(done) {
	var isWin = process.platform === "win32";
	//Dirty fix for the moment to avoid commenting out the ES processes

	if (isWin) {
		console.log(
			"doBuildESModules skipping because it doesnt seem to work under Windows:"
		);
		done();
		return;
	}
	const subP = spawn(
		"npx",
		[
			"babel",
			path.join(__dirname, "src"),
			"--out-dir",
			path.join(__dirname, "es"),
			"--env-name",
			"esm",
			"--verbose"
		],
		{ stdio: "inherit", windowsVerbatimArguments: true }
	);

	subP.on("close", code => {
		done();
	});
}

function doWatchESModules(done) {
	var isWin = process.platform === "win32";
	//Dirty fix for the moment to avoid commenting out the ES processes
	if (isWin) {
		console.log(
			"doWatchESModules skipping because it doesnt seem to work under Windows:"
		);
		done();
		return;
	}
	const subP = spawn(
		"npx",
		[
			"babel",
			path.join(__dirname, "src"),
			"--out-dir",
			path.join(__dirname, "es"),
			"--env-name",
			"esm",
			"--watch",
			"--skip-initial-build"
		],
		{ stdio: "inherit", windowsVerbatimArguments: true }
	);

	subP.on("close", code => {
		done();
	});
}

let doWebpack = cb => {
	let webpackConfig = require("./webpack.config.js");
	webpack(webpackConfig).run(webpackOnBuild(cb));
};

let watch = () => {
	let webpackConfig = require("./webpack.config.js");
	webpack(webpackConfig).watch(300, webpackOnBuild());
};

gulp.task(
	"dev",
	gulp.series(
		setDev,
		doWebpack,
		watch
	)
);

gulp.task(
	"build",
	gulp.series(
		setDev,
		doWebpack,
		setProduction,
		doWebpack // We can optimize this later maybe to import the ES modules instd of raw JS for speed, idk.
	)
);

gulp.task("build-dev", gulp.series(setDev, doWebpack));
