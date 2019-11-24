﻿/*
Deployment script for coffeedb

This code was generated by a tool.
Changes to this file may cause incorrect behavior and will be lost if
the code is regenerated.
*/

GO
SET ANSI_NULLS, ANSI_PADDING, ANSI_WARNINGS, ARITHABORT, CONCAT_NULL_YIELDS_NULL, QUOTED_IDENTIFIER ON;

SET NUMERIC_ROUNDABORT OFF;


GO
:setvar testVar "true"
:setvar DatabaseName "coffeedb"
:setvar DefaultFilePrefix "coffeedb"
:setvar DefaultDataPath ""
:setvar DefaultLogPath ""

GO
:on error exit
GO
/*
Detect SQLCMD mode and disable script execution if SQLCMD mode is not supported.
To re-enable the script after enabling SQLCMD mode, execute the following:
SET NOEXEC OFF; 
*/
:setvar __IsSqlCmdEnabled "True"
GO
IF N'$(__IsSqlCmdEnabled)' NOT LIKE N'True'
    BEGIN
        PRINT N'SQLCMD mode must be enabled to successfully execute this script.';
        SET NOEXEC ON;
    END


GO
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

INSERT INTO Records(Venue, Time, Date, memberID) VALUES ('Cafe Gomez', 4.40 , '11/11/2016', 84 );

--('maddy@test.com', '1234', '555-555-555', 'Maddy Chan');

END;
GO

GO
PRINT N'Update complete.';


GO
