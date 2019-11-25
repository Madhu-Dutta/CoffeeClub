/*
Post-Deployment Script Template							
--------------------------------------------------------------------------------------
 This file contains SQL statements that will be appended to the build script.		
 Use SQLCMD syntax to include a file in the post-deployment script.			
 Example:      :r .\myfile.sql								
 Use SQLCMD syntax to reference a variable in the post-deployment script.		
 Example:      :setvar TableName MyTable							
               SELECT * FROM [$(TableName)]					
--------------------------------------------------------------------------------------
*/
IF '$(testVar)' = 'true'
BEGIN

--Delete from tables
DELETE FROM Records;
DELETE FROM MemberLogin;

--Insert Values

INSERT INTO MemberLogin(Email, Password, Phone, FullName) VALUES 
('example@test.com', '1234', '444-444-444', 'Test User');

--INSERT INTO Records(Venue, Date, Time ) VALUES ('Cafe Gomez', '11/11/2016', '05/29/2015 05:50:06');

--('maddy@test.com', '1234', '555-555-555', 'Maddy Chan');

END;
GO
