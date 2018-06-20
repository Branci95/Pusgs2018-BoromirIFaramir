using System;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace RentApp.Models
{
    // Models used as parameters to AccountController actions.

    public class AddExternalLoginBindingModel
    {
        [Required]
        [Display(Name = "External access token")]
        public string ExternalAccessToken { get; set; }
    }

    public class ChangePasswordBindingModel
    {
        [Required]
        [DataType(DataType.EmailAddress)]
        [Display(Name = "Email")]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Current password")]
        public string OldPassword { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "New password")]
        public string NewPassword { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm new password")]
        [Compare("NewPassword", ErrorMessage = "The new password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }
    }

    public class RegisterBindingModel
    {
        [Required]
        [DataType(DataType.Text)]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 5)]
        [Display(Name = "FullName")]
        public string FullName { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        [Display(Name = "Email")]
        public string Email { get; set; }

        [Required]
        [Display(Name = "DateOfBirth")]
        [DataType(DataType.DateTime)]
        public DateTime? DateOfBirth { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm password")]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }
    }

    public class ChangeUserDataBindingModel
    {
        [Required]
        [DataType(DataType.Text)]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 5)]
        [Display(Name = "FullName")]
        public string FullName { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        [Display(Name = "Email")]
        public string Email { get; set; }

        [Required]
        [Display(Name = "DateOfBirth")]
        [DataType(DataType.DateTime)]
        public DateTime? DateOfBirth { get; set; }

        [DataType(DataType.Text)]
        [Display(Name = "Logo")]
        public string Logo { get; set; }
    }

    public class RegisterExternalBindingModel
    {
        [Required]
        [Display(Name = "Email")]
        public string Email { get; set; }
    }

    public class RemoveLoginBindingModel
    {
        [Required]
        [Display(Name = "Login provider")]
        public string LoginProvider { get; set; }

        [Required]
        [Display(Name = "Provider key")]
        public string ProviderKey { get; set; }
    }

    public class SetPasswordBindingModel
    {
        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "New password")]
        public string NewPassword { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm new password")]
        [Compare("NewPassword", ErrorMessage = "The new password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }
    }

    public class BranchBindingModel
    {
        [DataType(DataType.Text)]
        [Display(Name = "Logo")]
        public string Logo { get; set; }

        [Required]
        [DataType(DataType.Text)]
        [Display(Name = "Adress")]
        public string Adress { get; set; }

        [Required]
        [DataType(DataType.Text)]
        [Display(Name = "Latitude")]
        public double Latitude { get; set; }

        [Required]
        [DataType(DataType.Text)]
        [Display(Name = "Longitude")]
        public double Longitude { get; set; }

        [Required]
        [DataType(DataType.Text)]
        [Display(Name = "ServerName")]
        public string ServerName { get; set; }
    }

    public class TypeOfVehicleBindingModel
    {
        [DataType(DataType.Text)]
        [Display(Name = "Name")]
        public string Name { get; set; }
    }

    public class VehicleBindingModel
    {
        [Required]
        [DataType(DataType.Text)]
        [Display(Name = "Model")]
        public string Model { get; set; }

        [Required]
        [DataType(DataType.Text)]
        [Display(Name = "Manufactor")]
        public string Manufactor { get; set; }

        [Required]
        [DataType(DataType.Text)]
        [Display(Name = "Year")]
        public int Year { get; set; }
        
        [DataType(DataType.Text)]
        [Display(Name = "Description")]
        public string Description { get; set; }

        [DataType(DataType.Text)]
        [Display(Name = "Image")]
        public string Image { get; set; }

        [Required]
        [DataType(DataType.Text)]
        [Display(Name = "PricePerHour")]
        public decimal PricePerHour { get; set; }

        [Required]
        [DataType(DataType.Text)]
        [Display(Name = "TypeOfVehicle")]
        public string TypeOfVehicle { get; set; }

        [Required]
        [DataType(DataType.Text)]
        [Display(Name = "ServerName")]
        public string ServerName { get; set; }
    }
}
