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
    [Route("api/Notes")]
    public class NotesController : Controller
    {
        readonly ApiContext context;

        public NotesController(ApiContext context)
        {
            this.context = context;
        }

        //This is used to return all messages from backend to frontend
        //When you are on "Home" page this is called to display all Messages
        public IEnumerable<Mercury.Models.Notes> Get()
        {
            return context.Notes;
        }

        //this returns message when searching for name
        //When you click a user name, this returns only their messages
        [HttpGet("{userName}")]
        public IEnumerable<Mercury.Models.Notes> Get(string userName)
        {
            return context.Notes.Where(note => note.Owner == userName);
        }

        //This posts a message sent from the front end to the DB
        //Then it returns the mesage from the DB to the front end
        [HttpPost]
        public Mercury.Models.Notes Post([FromBody] Mercury.Models.Notes note)
        {
            var dbNote = context.Notes.Add(note).Entity;
            context.SaveChanges();
            return dbNote;
        }

    }
}