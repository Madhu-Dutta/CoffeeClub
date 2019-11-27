CREATE TABLE [dbo].[MemberLogin](    

    [id] [int] IDENTITY(1,1) NOT NULL,    

	[FullName] [varchar](MAX) NOT NULL,    

	[Phone] VARCHAR(MAX) NULL, 

    [Email] NVARCHAR(50) UNIQUE NOT NULL,    

    [Password] NVARCHAR(MAX) NOT NULL, 


    [Approved] INT NULL, 
    [Active] INT NULL, 
    CONSTRAINT [PK_MemberLogin] PRIMARY KEY CLUSTERED ([id] ASC),

)