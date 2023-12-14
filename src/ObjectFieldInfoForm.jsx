import React, { useState } from 'react';
import Handlebars from 'handlebars';
import { TextField, Box, Checkbox, FormControlLabel, Button, Select, MenuItem, TextareaAutosize, FormControl, InputLabel } from '@mui/material';

export default function ObjectFieldInfoForm() {
    const [copyLabel, setCopyLabel] = useState('Copy to Clipboard');
    const [generatedSQL, setGeneratedSQL] = useState('');

    function fillObjectTemplate(data) {
        const template = `
      --############ {{ObjectName}} Object ############
    IF ((SELECT COUNT(1) FROM [udp].[ObjectInfo] WHERE [Name] = '{{ObjectName}}') = 0)
    BEGIN
      INSERT INTO [udp].[ObjectInfo] ([DataSourceType], [Name], [IsGenerated], [Schema], [Properties], [NamespaceStructure], [SanitizedName])
      VALUES 
      ({{DataSourceType}}, '{{ObjectName}}', {{IsGenerated}}, '{{Schema}}', '{{Properties}}', '{
        "Controller": "{{controllerNamespaceStructure}}",
        "Service": "{{NameSpaceStructure}}",
        "Dao": "{{NameSpaceStructure}}",
        "Model": "{{NameSpaceStructure}}",
        "Interface": "{{NameSpaceStructure}}"
      }', 
      '{{SanitizedName}}')
    END
    `;

        const compiledTemplate = Handlebars.compile(template);
        console.log(data['Properties'])
        return compiledTemplate(data);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formProps = Object.fromEntries(formData);
        const sql = fillObjectTemplate(formProps);
        setGeneratedSQL(sql);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedSQL);
        setCopyLabel("Copied!");
    };

    return (
        <Box sx={{ '& > :not(style)': { m: 1 }, width: "500px", margin: "0 auto" }}>
            <h1>Object Field Info</h1>

            <form onSubmit={handleSubmit} id="dataSourceForm">
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

                    <Button type="submit" variant="contained" color="primary">
                        Generate SQL
                    </Button>

                    {generatedSQL && (
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
                            <Button
                                variant="contained"
                                onClick={copyToClipboard}
                            >
                                {copyLabel}
                            </Button>
                        </Box>
                    )}
                </Box>
            </form>

        </Box>
    );
}
