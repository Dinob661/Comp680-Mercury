using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mercury.Models;
using Microsoft.AspNetCore.Authorization;

namespace Mercury.Controllers
{
    public class EditMessage
    {
        public int MessageId { get; set; }
        public string Owner { get; set; }
        public string Text { get; set; }
        public string MsgActive { get; set; }

    }

    [Produces("application/json")]
    [Route("api/edit")]
    public class EditMessageController : Controller
    {
        readonly ApiContext context;

        public EditMessageController(ApiContext context)
        {
            this.context = context;
        }

        // GET: edit/5
        [HttpGet("{messageId}")]
        public IEnumerable<Mercury.Models.Messages> Get(int messageId)
        {
            //msg.MsgActive = "0";
            //context.SaveChanges();
            return context.Messages.Where(message => message.MessageId == messageId);
        }

        //delete
        [HttpPost("{messageId}")]
        public ActionResult Post([FromBody] EditMessage messageData)
        {
            var msg = context.Messages.SingleOrDefault(u => u.MessageId == messageData.MessageId);
            if(msg == null)
            {
                return NotFound("Message to delete not found.");
            }

            msg.MsgActive = "0";
            context.SaveChanges();

            return Ok(msg);
        }

        //delete
        [HttpPut("{messageId}")]
        public ActionResult Put([FromBody] EditMessage messageData)
        {
            var msg = context.Messages.SingleOrDefault(u => u.MessageId == messageData.MessageId);
            if (msg == null)
            {
                return NotFound("Message to delete not found.");
            }
            msg.Text = messageData.Text;

            context.SaveChanges();

            return Ok(msg);
        }

    }
}