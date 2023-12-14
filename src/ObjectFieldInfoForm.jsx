import React, { useCallback, useState } from 'react';
import { TextField, Box, Checkbox, FormControlLabel, Button, Select, MenuItem, TextareaAutosize, FormControl, InputLabel } from '@mui/material';

export default function ObjectFieldInfoForm() {
    const [copyLabel, setCopyLabel] = useState('Copy to Clipboard');
    const [objectName, setObjectName] = useState('');
    const [fieldName, setFieldName] = useState('');
    const [isGenerated, setIsGenerated] = useState(false);
    const [dataType, setDataType] = useState('');
    const [isPrimaryKey, setIsPrimaryKey] = useState(false);
    const [isIdentity, setIsIdentity] = useState(false);
    const [properties, setProperties] = useState('{"IsIdentifier":false,"IsSearchable":false,"IsOrderable":false,"IsDefaultVisible":false,"MaintainenceConfig":null}');
    const [dataTypeNamespace, setDataTypeNamespace] = useState('System');
    const [isUnique, setIsUnique] = useState(false);
    const [sanitizedFieldName, setSanitizedFieldName] = useState('');
    const [databaseDataType, setDatabaseDataType] = useState('');

    const fillObjectTemplate = useCallback(() => {
        return `
--############ ${fieldName} Field ############
DECLARE @${fieldName}Object NVARCHAR(100) = '${objectName}'
DECLARE @${fieldName}ObjectId INT
SET @${fieldName}ObjectId = (SELECT ID FROM [udp].[ObjectInfo] WHERE [Name] = @${fieldName}Object)

IF ((SELECT COUNT(1) FROM [udp].[ObjectFieldInfo] WHERE [Name] = '${fieldName}' AND [ObjectInfoID] = @${fieldName}ObjectId) = 0)
BEGIN
    INSERT INTO [udp].[ObjectFieldInfo] ([ObjectInfoID], [IsGenerated], [Name], [DataType], [IsPrimaryKey], [IsIdentity], [Properties], [DataTypeNamespace], [IsUnique], [DefaultValue], [ExtendedProperties], [SanitizedName], [DatabaseDataType])
    VALUES 
    (@${fieldName}ObjectId, ${isGenerated ? 1 : 0}, '${fieldName}', '${dataType}', ${isPrimaryKey ? 1 : 0}, ${isIdentity ? 1 : 0}, '${properties}', '${dataTypeNamespace}', ${isUnique ? 1 : 0}, '', NULL, '${sanitizedFieldName}', '${databaseDataType}')
END
        `;
    }, [objectName, fieldName, isGenerated, dataType, isPrimaryKey, isIdentity, properties, dataTypeNamespace, isUnique, sanitizedFieldName, databaseDataType]);

    const generatedSQL = fillObjectTemplate();

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedSQL);
        setCopyLabel("Copied!");
    };

    return (
        <Box sx={{ '& > :not(style)': { m: 1 }, maxWidth: "1000px", width: "50%", margin: "0 auto" }}>
            <h1>Object Field Info</h1>

            <form id="dataSourceForm">
                <Box sx={{ display: "flex", flexDirection: "column", gap: "25px" }}>
                    <TextField
                        label="Object Name"
                        id="ObjectName"
                        name="ObjectName"
                        value={objectName}
                        onChange={(e) => setObjectName(e.target.value)}
                        required
                    />

                    <TextField
                        label="Field Name"
                        id="fieldName"
                        name="fieldName"
                        value={fieldName}
                        onChange={(e) => setFieldName(e.target.value)}
                        required
                    />

                    <FormControlLabel
                        control={
                            <Checkbox
                                id="IsGenerated"
                                name="IsGenerated"
                                checked={isGenerated}
                                onChange={(e) => setIsGenerated(e.target.checked)}
                            />
                        }
                        label="Is Generated"
                    />

                    <TextField
                        label="Data Type"
                        id="DataType"
                        name="DataType"
                        value={dataType}
                        onChange={(e) => setDataType(e.target.value)}
                        required
                    />

                    <FormControlLabel
                        control={
                            <Checkbox
                                id="isPrimaryKey"
                                name="isPrimaryKey"
                                checked={isPrimaryKey}
                                onChange={(e) => setIsPrimaryKey(e.target.checked)}
                            />
                        }
                        label="Is Primary Key"
                    />

                    <FormControlLabel
                        control={
                            <Checkbox
                                id="isIdentity"
                                name="isIdentity"
                                checked={isIdentity}
                                onChange={(e) => setIsIdentity(e.target.checked)}
                            />
                        }
                        label="Is Identity"
                    />

                    <TextField
                        label="Properties"
                        id="Properties"
                        name="Properties"
                        multiline
                        rows={5}
                        value={properties}
                        onChange={(e) => setProperties(e.target.value)}
                        required
                    />

                    <TextField
                        label="Data Type Namespace"
                        id="dataTypeNameSpace"
                        name="dataTypeNameSpace"
                        value={dataTypeNamespace}
                        onChange={(e) => setDataTypeNamespace(e.target.value)}
                        required
                    />

                    <FormControlLabel
                        control={
                            <Checkbox
                                id="isUnique"
                                name="isUnique"
                                checked={isUnique}
                                onChange={(e) => setIsUnique(e.target.checked)}
                            />
                        }
                        label="Is Unique"
                    />

                    <TextField
                        label="Sanitized Field Name"
                        id="SanitizedfieldName"
                        name="SanitizedfieldName"
                        value={sanitizedFieldName}
                        onChange={(e) => setSanitizedFieldName(e.target.value)}
                        required
                    />

                    <TextField
                        label="Database Data Type"
                        id="dataBaseDataType"
                        name="dataBaseDataType"
                        value={databaseDataType}
                        onChange={(e) => setDatabaseDataType(e.target.value)}
                        required
                    />

                    <Box sx={{ marginTop: '20px' }}>
                        <h2>Generated SQL</h2>
                        <TextareaAutosize
                            id="sqlcode"
                            aria-label="Generated SQL"
                            minRows={10}
                            style={{ width: '100%' }}
                            value={generatedSQL}
                            readOnly
                        />
                        <Button variant="contained" onClick={copyToClipboard}>
                            {copyLabel}
                        </Button>
                    </Box>
                </Box>
            </form>

        </Box>
    );
}
