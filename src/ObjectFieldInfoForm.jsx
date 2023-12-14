import React, { useState } from 'react';
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

    const fillObjectTemplate = () => {
        return `
        --############ ${objectName} Object ############
        IF ((SELECT COUNT(1) FROM [udp].[ObjectInfo] WHERE [Name] = '${objectName}') = 0)
        BEGIN
            INSERT INTO [udp].[ObjectInfo] ([FieldName], [IsGenerated], [DataType], [IsPrimaryKey], [IsIdentity], [Properties], [DataTypeNamespace], [IsUnique], [SanitizedFieldName], [DatabaseDataType])
            VALUES 
            ('${fieldName}', ${isGenerated}, '${dataType}', ${isPrimaryKey}, ${isIdentity}, '${properties}', '${dataTypeNamespace}', ${isUnique}, '${sanitizedFieldName}', '${databaseDataType}')
        END
        `;
    };

    const generatedSQL = fillObjectTemplate();

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedSQL);
        setCopyLabel("Copied!");
    };

    return (
        <Box sx={{ '& > :not(style)': { m: 1 }, maxWidth: "800px", width: "50%", margin: "0 auto" }}>
            <h1>Object Field Info</h1>

            <form id="dataSourceForm">
                <Box sx={{ display: "flex", flexDirection: "column", gap: "25px" }}>
                    <TextField label="Object Name" id="ObjectName" name="ObjectName" required />

                    <TextField label="Field Name" id="fieldName" name="fieldName" required />

                    <FormControlLabel
                        control={<Checkbox id="IsGenerated" name="IsGenerated" defaultChecked />}
                        label="Is Generated"
                    />

                    <TextField label="Data Type" id="DataType" name="DataType" required> </TextField>

                    <FormControlLabel
                        control={<Checkbox id="isPrimaryKey" name="isPrimaryKey" />}
                        label="Is Primary Key"
                    />

                    <FormControlLabel
                        control={<Checkbox id="isIdentity" name="isIdentity" />}
                        label="Is Identity"
                    />

                    <TextField
                        label="Properties"
                        id="Properties"
                        name="Properties"
                        multiline
                        rows={5}
                        required
                        defaultValue='{"IsIdentifier":false,"IsSearchable":false,"IsOrderable":false,"IsDefaultVisible":false,"MaintainenceConfig":null}'
                    />

                    <TextField label="Data Type Namespace" id="dataTypeNameSpace" name="dataTypeNameSpace" required defaultValue="System" />

                    <FormControlLabel
                        control={<Checkbox id="isUnique" name="isUnique" />}
                        label="Is Unique"
                    />

                    <TextField label="Sanitized Field Name" id="SanitizedfieldName" name="SanitizedfieldName" required />

                    <TextField label="Database Data Type" id="dataBaseDataType" name="dataBaseDataType" required />

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
