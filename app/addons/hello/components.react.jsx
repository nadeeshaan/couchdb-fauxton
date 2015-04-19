define([
	"api",
	"react"
	], function (FauxtonAPI, React) {



		return {
			renderSAMPLE: function (el) {
				React.render(<App />, el);
			},
		};
	});