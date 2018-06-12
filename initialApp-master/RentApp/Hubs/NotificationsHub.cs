using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using System.Threading;

namespace RentApp.Hubs
{
    [HubName("notifications")]
    public class NotificationsHub : Hub
    {
        private static IHubContext hubContext = GlobalHost.ConnectionManager.GetHubContext<NotificationsHub>();
        //private static Timer t = new Timer();
        
        public void Hello()
        {
            hubContext.Clients.All.hello("Hello from server!");
        }

        public void GetRealTime()
        {
            Clients.All.setRealTime(DateTime.Now.ToString("h:mm:ss tt"));
        }

        public void TimeServerUpdates()
        {
            
        }
    }
}