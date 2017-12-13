USE [AddressBook]
GO

ALTER TABLE [dbo].[UserContact] DROP CONSTRAINT [FK_UserContact_Users]
GO

ALTER TABLE [dbo].[UserContact] DROP CONSTRAINT [FK_UserContact_Contact]
GO

/****** Object:  Table [dbo].[UserContacts]    Script Date: 12/13/2017 4:02:12 AM ******/
DROP TABLE [dbo].[UserContact]
GO

/****** Object:  Table [dbo].[User]    Script Date: 12/13/2017 3:21:48 AM ******/
DROP TABLE [dbo].[Users]
GO

ALTER TABLE [dbo].[Email] DROP CONSTRAINT [FK_Contact_Email]
GO

/****** Object:  Table [dbo].[Email]    Script Date: 12/13/2017 3:21:14 AM ******/
DROP TABLE [dbo].[Email]
GO

ALTER TABLE [dbo].[Address] DROP CONSTRAINT [FK_Contact_Address]
GO

ALTER TABLE [dbo].[Address] DROP CONSTRAINT [FK_AddressType_Address]
GO

/****** Object:  Table [dbo].[Address]    Script Date: 12/13/2017 3:19:39 AM ******/
DROP TABLE [dbo].[Address]
GO

/****** Object:  Table [dbo].[AddressType]    Script Date: 12/13/2017 3:19:11 AM ******/
DROP TABLE [dbo].[AddressType]
GO

/****** Object:  Table [dbo].[EmailType]    Script Date: 12/13/2017 3:20:58 AM ******/
DROP TABLE [dbo].[EmailType]
GO

/****** Object:  Table [dbo].[Contact]    Script Date: 12/13/2017 3:17:43 AM ******/
DROP TABLE [dbo].[Contact]
GO

/************************************************************************************************************************************/
/************************************************************************************************************************************/

/****** Object:  Table [dbo].[Contact]    Script Date: 12/13/2017 3:17:43 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Contact](
	[ContactId] [int] IDENTITY(1,1) NOT NULL,
	[ContactFirstName] [varchar](50) NOT NULL,
	[ContactMiddleName] [varchar](50) NULL,
	[ContactLastName] [varchar](50) NOT NULL,
	[ContactNickname] [varchar](50) NULL,
	[ContactCompany] [varchar](50) NULL,
	[ContactTitle] [varchar](50) NULL,
	[ContactNotes] [varchar](max) NULL,
	[ContactModified] [datetime] NOT NULL,
 CONSTRAINT [PK_Contact] PRIMARY KEY CLUSTERED 
(
	[ContactId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

/************************************************************************************************************************************/
/************************************************************************************************************************************/

/****** Object:  Table [dbo].[AddressType]    Script Date: 12/13/2017 3:19:11 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[AddressType](
	[AddressTypeId] [int] NOT NULL,
	[AddressTypeCode] [varchar](50) NOT NULL,
	[AddressTypeDescription] [varchar](50) NULL,
 CONSTRAINT [PK_AddressType] PRIMARY KEY CLUSTERED 
(
	[AddressTypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

/************************************************************************************************************************************/
/************************************************************************************************************************************/

/****** Object:  Table [dbo].[Address]    Script Date: 12/13/2017 3:19:39 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Address](
	[AddressId] [int] IDENTITY(1,1) NOT NULL,
	[ContactId] [int] NOT NULL,
	[AddressTypeId] [int] NOT NULL,
	[AddressLine1] [varchar](max) NULL,
	[AddressLine2] [varchar](max) NULL,
	[AddressCity] [varchar](50) NOT NULL,
	[AddressState] [varchar](50) NOT NULL,
	[AddressZip] [int] NOT NULL,
	[AddressCountry] [varchar](50) NOT NULL,
	[AddressModified] [datetime] NOT NULL
 CONSTRAINT [PK_Address] PRIMARY KEY CLUSTERED 
(
	[AddressId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[Address]  WITH CHECK ADD  CONSTRAINT [FK_AddressType_Address] FOREIGN KEY([AddressTypeId])
REFERENCES [dbo].[AddressType] ([AddressTypeId])
GO

ALTER TABLE [dbo].[Address] CHECK CONSTRAINT [FK_AddressType_Address]
GO

ALTER TABLE [dbo].[Address]  WITH CHECK ADD  CONSTRAINT [FK_Contact_Address] FOREIGN KEY([ContactId])
REFERENCES [dbo].[Contact] ([ContactId])
GO

ALTER TABLE [dbo].[Address] CHECK CONSTRAINT [FK_Contact_Address]
GO

/************************************************************************************************************************************/
/************************************************************************************************************************************/


/****** Object:  Table [dbo].[EmailType]    Script Date: 12/13/2017 3:20:58 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[EmailType](
	[EmailTypeId] [int] IDENTITY(1,1) NOT NULL,
	[EmailTypeCode] [varchar](50) NOT NULL,
	[EmailTypeDescription] [varchar](max) NULL,
	[EmailTypeModified] [datetime] NOT NULL,
 CONSTRAINT [PK_EmailType] PRIMARY KEY CLUSTERED 
(
	[EmailTypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO


/************************************************************************************************************************************/
/************************************************************************************************************************************/

/****** Object:  Table [dbo].[Email]    Script Date: 12/13/2017 3:21:14 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Email](
	[EmailId] [int] IDENTITY(1,1) NOT NULL,
	[ContactId] [int] NOT NULL,
	[EmailAddress] [varchar](max) NOT NULL,
	[EmailTypeId] [int] NOT NULL,
	[EmailModified] [datetime] NOT NULL,
 CONSTRAINT [PK_Email] PRIMARY KEY CLUSTERED 
(
	[EmailId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[Email]  WITH CHECK ADD  CONSTRAINT [FK_Contact_Email] FOREIGN KEY([ContactId])
REFERENCES [dbo].[Contact] ([ContactId])
GO

ALTER TABLE [dbo].[Email] CHECK CONSTRAINT [FK_Contact_Email]
GO


/************************************************************************************************************************************/
/************************************************************************************************************************************/

/****** Object:  Table [dbo].[User]    Script Date: 12/13/2017 3:21:48 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Users](
	[UsersId] [int] IDENTITY(1,1)  NOT NULL,
	[UsersFirstName] [varchar](max) NULL,
	[UsersMiddleName] [varchar](max) NULL,
	[UsersLastName] [varchar](max) NULL,
	[UsersEmail] [varchar](max) NULL,
	[UsersPassword] [varchar](max) NOT NULL
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[UsersId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO


/************************************************************************************************************************************/
/************************************************************************************************************************************/

/****** Object:  Table [dbo].[UserContacts]    Script Date: 12/13/2017 4:12:55 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[UserContact](
	[UserContactId] [int] IDENTITY(1,1) NOT NULL,
	[UsersId] [int] NOT NULL,
	[ContactId] [int] NOT NULL,
	[UserContactModified] [datetime] NOT NULL,
 CONSTRAINT [PK_UserContact] PRIMARY KEY CLUSTERED 
(
	[UserContactId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[UserContact]  WITH CHECK ADD  CONSTRAINT [FK_UserContact_Contact] FOREIGN KEY([ContactId])
REFERENCES [dbo].[Contact] ([ContactId])
GO

ALTER TABLE [dbo].[UserContact] CHECK CONSTRAINT [FK_UserContact_Contact]
GO

ALTER TABLE [dbo].[UserContact]  WITH CHECK ADD  CONSTRAINT [FK_UserContact_Users] FOREIGN KEY([UsersId])
REFERENCES [dbo].[Users] ([UsersId])
GO

ALTER TABLE [dbo].[UserContact] CHECK CONSTRAINT [FK_UserContact_Users]
GO


