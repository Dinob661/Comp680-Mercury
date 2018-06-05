using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Mercury.Models
{
    public class ApiContext : DbContext
    {
        public virtual DbSet<Markers> Markers { get; set; }
        public virtual DbSet<Messages> Messages { get; set; }
        public virtual DbSet<Notes> Notes { get; set; }
        public virtual DbSet<Users> Users { get; set; }

        public ApiContext()
        {
        }

        public ApiContext(DbContextOptions<ApiContext> options) : base(options) { }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Markers>(entity =>
            {
                entity.HasKey(e => e.MarkerId);
                
                entity.Property(e => e.Owner).IsRequired();

                entity.Property(e => e.Bldg).IsRequired();
                
                entity.Property(e => e.MarkerName).IsRequired();

                entity.HasOne(d => d.OwnerNavigation)
                    .WithMany(p => p.Markers)
                    .HasForeignKey(d => d.OwnerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Markers_Users");
            });

            modelBuilder.Entity<Messages>(entity =>
            {
                entity.HasKey(e => e.MessageId);

                entity.HasIndex(e => e.OwnerId);

                entity.Property(e => e.Date).IsRequired();

                entity.Property(e => e.MsgActive).IsRequired();

                entity.Property(e => e.Owner).IsRequired();

                entity.Property(e => e.Text).IsRequired();

                entity.HasOne(d => d.OwnerNavigation)
                    .WithMany(p => p.Messages)
                    .HasForeignKey(d => d.OwnerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Messages_Users");
            });

            modelBuilder.Entity<Notes>(entity =>
            {
                entity.HasKey(e => e.NoteId);

                entity.HasIndex(e => e.OwnerId);

                entity.Property(e => e.Date).IsRequired();

                entity.Property(e => e.NoteActive).IsRequired();

                entity.Property(e => e.NoteText).IsRequired();

                entity.Property(e => e.Owner).IsRequired();

                entity.HasOne(d => d.OwnerNavigation)
                    .WithMany(p => p.Notes)
                    .HasForeignKey(d => d.OwnerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Notes_Users");
            });

            modelBuilder.Entity<Users>(entity =>
            {
                entity.Property(e => e.Email).IsRequired();

                entity.Property(e => e.FirstName).IsRequired();

                entity.Property(e => e.LastName).IsRequired();

                entity.Property(e => e.Password).IsRequired();

                entity.Property(e => e.UserActive)
                    .IsRequired()
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.UserName).IsRequired();
            });
        }
    }
}
