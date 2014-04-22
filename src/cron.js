var cron = {
	timer: null,
	busy: false,
	jobs: [],
	_jsonps: [],
	list: function() {
		return this.jobs;
	},
	clear: function() {
		this.stop();
		this.jobs = [];
	},
	add: function(schedule, exec) {
		var pattern = /(\*|([0-6]{0,1}[0-9]{1}))(\/[0-6]{0,1}[0-9]{1})?/gi;
		var tokens = schedule.match(pattern);

		if(tokens) {
			this.jobs.push({ "schedule": tokens, "exec": exec });
			return true;
		}

		return false;
	},
	_http: function(url) {
		var http = null;

		try{ http = new XMLHttpRequest(); }
		catch(e) {}
		try{ http = new ActiveXObject("Msxml2.XMLHTTP"); }
		catch(e) {}
		try{ http = new ActiveXObject("Microsoft.XMLHTTP"); }
		catch(e) {}

		if(http) {
			http.open("GET", url, true);
			http.send(null);
			http.onreadystatechange = function() {
				if(http.readyState === 4) {
					if(http.status === 200) {
						// success
						return true;

					}else {
						// failure
						return false;
					}
				}
			};
			
		}
	},
	_jsonp: function(src) {
		var script = document.createElement("script");
		script.src = src + (src.indexOf("?") >= 0 ? "&" : "?") + "_=" + new Date().getTime();
		document.getElementsByTagName("head")[0].appendChild(script);

		this._jsonps.push(script);
	},
	run: function() {
		if(!!!this.busy) {
			this.busy = true;
			var i;
			
			for(i in this._jsonps) {
				document.getElementsByTagName("head")[0].removeChild(this._jsonps[i]);
			}
			this._jsonps = [];

			var date = new Date();
			var checklist = [date.getMinutes(), date.getHours(), date.getDate(), date.getMonth(), date.getDay()];

			for(i in this.jobs) {
				var job = this.jobs[i];
				var checker = true;

				var j;
				for(j=0; j<checklist.length && checker; ++j) {
					var tokens = job.schedule[j].split("/");

					if((tokens.length === 1 && tokens[0] === "*") ||
						(tokens.length === 1 && parseInt(tokens[0]) === checklist[j]) ||
						(tokens.length > 1 && parseInt(checklist[j]) % parseInt(tokens[1])) === 0) {
						continue;

					}else {
						checker = false;
					}
				}

				if(checker) {
					switch(typeof(job.exec)) {
						case "function":
							job.exec();
							break;

						case "string":
							this._jsonp(job.exec);
							break;
					}
				}
			}
		}

		this.busy = false;
	},
	start: function() {
		if(!!!this.timer) {
			this.timer = setInterval(function() {
				cron.run();
			}, 60000);

			return true;
		}

		return false;
	},
	stop: function() {
		clearInterval(this.timer);
		this.timer = null;

		return true;
	}
};

