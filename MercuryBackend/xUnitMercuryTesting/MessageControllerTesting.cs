using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using Xunit;
using Mercury.Models;
using Mercury.Controllers;

namespace xUnitBringPiTesting
{
    public class MessageControllerTesting
    {
        //this test getting from Database
        [Fact]
        public void ShouldReturnMessageTypeFromGet()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<ApiContext>()
                .UseInMemoryDatabase(databaseName: "ShouldReturnMessageTypeFromGet")
                .Options;

            var context = new ApiContext(options);
            var controller = new MessagesController(context);

            Seed(context);

            //Act
            var result = controller.Get(); //calls Get() to get username


            //Assert
            var model = Assert.IsAssignableFrom<IEnumerable<Mercury.Models.Messages>>(result);

        }

        //this tests posting to database
        [Fact]
        public void ShouldPostNewMessageAndReturnPostedType()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<ApiContext>()
                .UseInMemoryDatabase(databaseName: "ShouldPostNewMessageAndReturnPostedType")
                .Options;

            var context = new ApiContext(options);
            var controller = new MessagesController(context);

            Seed(context);

            //Act
            var result = controller.Post(new Mercury.Models.Messages { MessageId = 1, Owner = "TestOwner", Date = "11/06/17 6:01 AM", Text = "This is just a test" });

            //Assert
            Assert.IsType<Mercury.Models.Messages>(result);

        }

        private void Seed(ApiContext context)
        {
            context.Messages.Add(new 
                Mercury.Models.Messages
            {
                Owner = "Teapot",
                Text = "Here is my handle",
                Date = "11/29/2017, 11:16:22 AM"
            });
            context.Messages.Add(new Mercury.Models.Messages
            {
                Owner = "ImaLittle",
                Text = "Here is my spout",
                Date = "11/29/2017, 11:16:22 AM"
            });

            context.SaveChanges();
        }
    }
}
