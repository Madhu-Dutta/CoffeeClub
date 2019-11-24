CREATE TABLE [dbo].[Records]
(
	[RecordID] [int] IDENTITY(1,1) NOT NULL,   
    [Date] DATE NOT NULL, 
    [Venue] NVARCHAR(MAX) NOT NULL, 
    [CreatedBy] INT NOT NULL, 
    [Payment] FLOAT NULL, 
    [Time] DATETIME NOT NULL, 
    [PaidBy] INT NULL, 
    CONSTRAINT [PK_Records] PRIMARY KEY ([RecordID]),
	CONSTRAINT [FK_Records_Member] Foreign key ([CreatedBy]) references MemberLogin([id]),
	CONSTRAINT [FK_Records_Member_Paid] Foreign key ([PaidBy]) references MemberLogin([id]),
)
