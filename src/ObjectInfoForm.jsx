import React, { useState, useEffect } from 'react';
import Handlebars from 'handlebars';
import { TextField, Checkbox, FormControlLabel, Button, FormControl, InputLabel, Select, MenuItem, Box, TextareaAutosize } from '@mui/material';

function ObjectInfoForm() {
    const [dataSourceType, setDataSourceType] = useState('');
    const [name, setName] = useState('');
    const [isGenerated, setIsGenerated] = useState(false);
    const [schema, setSchema] = useState('');
    const [controllerNamespaceStructure, setControllerNamespaceStructure] = useState('Univerus.Unity.Starter.Project');
    const [namespaceStructure, setNamespaceStructure] = useState('Univerus.Unity.Starter.Project');
    const [properties, setProperties] = useState('{"IsConfig":false}');
    const [sanitizedName, setSanitizedName] = useState('');
    const [generatedSQL, setGeneratedSQL] = useState('');
    const [copyLabel, setCopyLabel] = useState('Copy to Clipboard');

    useEffect(() => {
        setSanitizedName(name);
    }, [name]);

    const handleSchemaChange = (event) => {
        setSchema(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            DataSourceType: dataSourceType,
            ObjectName: name,
            IsGenerated: isGenerated,
            Schema: schema,
            Properties: properties,
            controllerNamespaceStructure: controllerNamespaceStructure,
            NameSpaceStructure: namespaceStructure,
            SanitizedName: sanitizedName
        };
        const sql = fillObjectTemplate(data);
        setGeneratedSQL(sql);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedSQL);
        setCopyLabel("Copied!");
    };

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
    return (
        <Box sx={{ '& > :not(style)': { m: 1 }, width: "500px", margin: "0 auto" }}>
            <h1>Object Info</h1>
            <form id="dataSourceForm" onSubmit={handleSubmit}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: "25px" }}>
                    <TextField label="Data Source Type" value={dataSourceType} onChange={e => setDataSourceType(e.target.value)} required />

                    <TextField label="Name" value={name} onChange={e => setName(e.target.value)} required />

                    <FormControlLabel
                        control={<Checkbox checked={isGenerated} onChange={e => setIsGenerated(e.target.checked)} />}
                        label="Is Generated"
                    />

                    <FormControl fullWidth>
                        <InputLabel sx={{ backgroundColor: "white" }}>Schema</InputLabel>
                        <Select value={schema} onChange={handleSchemaChange}>
                            <MenuItem value="dbo">dbo</MenuItem>
                            <MenuItem value="udp">udp</MenuItem>
                            <MenuItem value="other">other</MenuItem>
                        </Select>
                    </FormControl>

                    {schema === 'other' && <TextField label="Other Schema" />}

                    <TextField label="Controller Namespace Structure" value={controllerNamespaceStructure} onChange={e => setControllerNamespaceStructure(e.target.value)} required />

                    <TextField label="Namespace Structure" value={namespaceStructure} onChange={e => setNamespaceStructure(e.target.value)} required />

                    <TextField label="Properties" value={properties} onChange={e => setProperties(e.target.value)} required />

                    <TextField label="Sanitized Name" value={sanitizedName} onChange={e => setSanitizedName(e.target.value)} required />

                    <Button type="submit" variant="contained" color="primary">Submit</Button>
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

export default ObjectInfoForm;
