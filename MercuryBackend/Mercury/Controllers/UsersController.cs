using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Mercury.Models;

namespace Mercury.Controllers
{
    //The Users Controller is strictly for the user to edit their data
    public class EditProfileData
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string UserActive { get; set; }
    }

    //This section divides the data up from the JSON file to match the DB
    [Produces("application/json")]
    [Route("api/Users")]
    public class UsersController : Controller
    {
        readonly ApiContext context;

        public UsersController(ApiContext context)
        {
            this.context = context;
        }

        //returns the user information to the edit user screen
        [HttpGet("{id}")]
        public ActionResult Get(int id)
        {
            var user = context.Users.SingleOrDefault(u => u.Id == id);

            if (user == null)
                return NotFound("User not found");

            return Ok(user);
        }

        //Authorizes the user to access the current edit user screen
        [Authorize]
        [HttpGet("me")]
        public ActionResult Get()
        {
            return Ok(GetSecureUser());
        }


        //This is where the user is editing their information
        // First, the user information is checked against the DB information
        // If the information is different, it posts the new information over
        // the old information. the "??" is an if/then check
        [Authorize]
        [HttpPost("me")]
        public ActionResult Post([FromBody] EditProfileData profileData)
        {
            var user = GetSecureUser();

            user.FirstName = profileData.FirstName ?? user.FirstName;
            user.LastName = profileData.LastName ?? user.LastName;
            user.Email = profileData.Email ?? user.Email;
            user.Password = profileData.Password ?? user.Password;
            user.UserActive = profileData.UserActive ?? user.UserActive;

            context.SaveChanges();

            return Ok(user);
        }

        // DELETE 
        //this doesn't work. I removed it and it needs work.
        [Authorize]
        [HttpDelete("me")]
        public ActionResult Delete()
        {
            var user = GetSecureUser();
            context.Remove(user);
            context.SaveChanges();
            return Ok(user);
        }

            //this returns user ID for editing user
            Mercury.Models.Users GetSecureUser()
        {
            var id = HttpContext.User.Claims.First().Value;
            return context.Users.SingleOrDefault(u => u.Id == Int32.Parse(id));
        }
    }
}