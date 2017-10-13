declare namespace BeautifulLog {
	function trace(log: string): void;
	function debug(log: string): void;
	function info(log: string): void;
	function warn(log: string): void;
	function err(log: string): void;
	function fatal(log: string): void;
}

export = BeautifulLog;
