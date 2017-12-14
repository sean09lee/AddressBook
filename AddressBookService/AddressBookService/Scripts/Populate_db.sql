USE [AddressBook]
GO

-- Insert into dbo.Contact
insert into Contact (ContactFirstName, ContactLastName, ContactModified)
values ('Abby', 'Abernathe', GetDate())
insert into Contact (ContactFirstName, ContactLastName, ContactModified)
values ('Bob', 'Burger', GetDate())
insert into Contact (ContactFirstName, ContactMiddleName, ContactLastName, ContactModified)
values ('Chappy', 'Charlotte','Corinthian', GetDate())
insert into Contact (ContactFirstName, ContactLastName, ContactModified)
values ('Don', 'Dean', GetDate())
insert into Contact (ContactFirstName, ContactLastName, ContactModified)
values ('Ziggy', 'Zainy', GetDate())
select * from Contact

-- Insert into dbo.Users
insert into Users(UsersFirstName, UsersLastName, UsersEmail, UsersPassword)
values('Sean', 'Lee', 'sean09lee@gmail.com', 'password')
select * from dbo.Users

-- Insert into dbo.UserContact
insert into UserContact(UsersId, ContactId, UserContactModified)
select 1 UsersId, ContactId, GetDate() UserContactModified
from Contact;
select * from UserContact

--Insert into dbo.AddressType
insert into AddressType(AddressTypeCode, AddressTypeDescription, AddressTypeModified)
values ('Primary', 'Primary address', GetDate())
insert into AddressType(AddressTypeCode, AddressTypeDescription, AddressTypeModified)
values ('School', 'School address', GetDate())
insert into AddressType(AddressTypeCode, AddressTypeDescription, AddressTypeModified)
values ('Work', 'Work address', GetDate())

