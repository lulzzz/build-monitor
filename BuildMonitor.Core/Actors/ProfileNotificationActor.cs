﻿using Akka.Actor;
using BuildMonitor.Contracts;
using BuildMonitor.Contracts.Actors;
using Microsoft.AspNetCore.SignalR;

namespace BuildMonitor.Core.Actors
{
	class NotifyClient
	{
		public NotifyClient(string profileName, string connectionId, ProfileData data) {
			ConnectionId = connectionId;
			Data = data;
			ProfileName = profileName;
		}

		public ProfileData Data { get; }
		public string ConnectionId { get; }
		public string ProfileName { get; }
	}

	public class ProfileNotificationActor : ReceiveActor
	{
		public ProfileNotificationActor(IHubContext<ProfileHub> hubContext) {
			Receive<NotifyClient>(async msg => {
				var target = string.IsNullOrWhiteSpace(msg.ConnectionId)
					? hubContext.Clients.Group(msg.ProfileName)
					: hubContext.Clients.Client(msg.ConnectionId);
				await target.SendAsync("profileDataReady", msg.ProfileName, msg.Data);
			});
			Receive<BuildInfoMessage>(async msg => {
				var target = hubContext.Clients.Group(msg.Config.Id);
				await target.SendAsync("buildInfoReady", msg);
			});
		}
	}
}
