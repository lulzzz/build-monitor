﻿namespace BuildMonitor.Contracts.Actors
{
	public class BuildData
	{
		public BuildViewType ViewType { get; set; }
		public BuildInfo Config { get; set; }
	}
}