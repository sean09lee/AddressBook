//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace AddressBookService.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Email
    {
        public int EmailId { get; set; }
        public int ContactId { get; set; }
        public string EmailAddress { get; set; }
        public int EmailTypeId { get; set; }
        public System.DateTime EmailModified { get; set; }
    
        public virtual Contact Contact { get; set; }
        public virtual EmailType EmailType { get; set; }
    }
}
