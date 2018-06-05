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

    //This section divides the data up from the JSON file to match the DB
    [Produces("application/json")]
    [Route("api/Markers")]
    public class MarkersController : Controller
    {
        readonly ApiContext context;

        public MarkersController(ApiContext context)
        {
            this.context = context;
        }

        ////This is used to return all messages from backend to frontend
        ////When you are on "Home" page this is called to display all Messages
        //public IEnumerable<Mercury.Models.Markers> Get()
        //{
        //    return context.Markers;
        //}

        //this returns message when searching for name
        //When you click a user name, this returns only their messages
        [HttpGet("{userName}")]
        public IEnumerable<Mercury.Models.Markers> Get(string userName)
        {
            return context.Markers.Where(markers => markers.Owner == userName);
        }

        //This posts a message sent from the front end to the DB
        //Then it returns the mesage from the DB to the front end
        [HttpPost]
        public Mercury.Models.Markers Post([FromBody] Mercury.Models.Markers marker)
        {
            var dbMarker = context.Markers.Add(marker).Entity;
            context.SaveChanges();
            return dbMarker;
        }

        [HttpDelete("{Id}")]
        public ActionResult Delete(int Id)
        {
            var roomToDelete = context.Markers.Find(Id);

            if(roomToDelete == null)
            {
                return NotFound();
            }

            context.Markers.Remove(roomToDelete);
            context.SaveChanges();
            return Ok(Id);
        }



    }
}