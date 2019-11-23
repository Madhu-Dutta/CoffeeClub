CREATE TABLE [dbo].[MemberLogin](    

    [Id] [int] IDENTITY(1,1) NOT NULL,    

	[FullName] [varchar](MAX) NOT NULL,    

	[Phone] VARCHAR(MAX) NULL, 

    [Email] NVARCHAR(MAX) NOT NULL,    

    [Password] NVARCHAR(MAX) NOT NULL, 

    CONSTRAINT [PK_MemberLogin] PRIMARY KEY CLUSTERED ([Id] ASC),

)