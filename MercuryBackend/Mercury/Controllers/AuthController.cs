using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Mercury.Models;

//Auth controller controls Login and Registration
namespace MessageBoardBackend.Controllers
{
    // This info is what is sent to the front end in the packet
    public class JwtPacket
    {
        public string Token { get; set; }    //token for current users session
        public string UserName { get; set; } //
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Id { get; set; }
    }

    // This info comes from the front end to varify user
    public class LoginData
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    //this parses the auth JSON into the users table format
    [Produces("application/json")]
    [Route("auth")]
    public class AuthController : Controller
    {
        readonly ApiContext context;

        public AuthController(ApiContext context)
        {
            this.context = context;
        }

        //checks to see if users login data is correct
        //if correct supply token for current session (the CreateJwtPacket(user))
        [HttpPost("login")]
        public ActionResult Login([FromBody] LoginData loginData)
        {
            var user = context.Users.SingleOrDefault(u => u.Email == loginData.Email && u.Password == loginData.Password && u.UserActive == "1");

            if (user == null)
            {
                return NotFound("email or password incorrect");
            }

            return Ok(CreateJwtPacket(user));
        }

        //handles the registration page information
        //adds user if username is unique
        [HttpPost("register")]
        public JwtPacket Register([FromBody]Mercury.Models.Users user)
        {
            //add info from packet to DB
            context.Users.Add(user);
            //save changes
            context.SaveChanges();

            //returns token to user
            return CreateJwtPacket(user);
        }


        //creates the users token
        //the token is what verifies if the user is currently logged in
        JwtPacket CreateJwtPacket(Mercury.Models.Users user)
        {
            var origin = user.Id;

            var signingKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes("this is the secret phrase"));

            var signingCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);

            var claims = new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString())
            };

            var jwt = new JwtSecurityToken(claims: claims, signingCredentials: signingCredentials);

            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            return new JwtPacket() { Token = encodedJwt, UserName = user.UserName, FirstName = user.FirstName, LastName = user.LastName, Id = origin.ToString() };

        }
    }
}