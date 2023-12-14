# Object Info Form Component

## Overview

This React component is used for generating SQL queries based on user inputs. It leverages `Handlebars` for template compilation and `@mui/material` for UI components.

## Features

- Dynamically generate SQL queries for object information.
- Interactive form with various input types including text fields, checkboxes, and select dropdowns.
- Live update of the sanitized name based on the 'Name' input.
- Copy generated SQL to clipboard functionality.

## Usage

1. **Data Source Type**: Enter the type of data source.
2. **Name**: Specify the name of the object.
3. **Is Generated**: Check if the object is generated.
4. **Schema**: Select a schema from the dropdown or specify if 'other'.
5. **Controller Namespace Structure**: Input for the controller's namespace structure.
6. **Namespace Structure**: Define the namespace structure.
7. **Properties**: Enter properties in JSON format.
8. **Sanitized Name**: This field will auto-fill based on the 'Name' input.
9. **Submit Button**: Click to generate SQL based on the inputs.
10. **Generated SQL Area**: Displays the generated SQL query.
11. **Copy to Clipboard**: Copies the generated SQL to the clipboard.

# ObjectFieldInfoForm Component

## Overview

`ObjectFieldInfoForm` is a React component that facilitates generating SQL statements based on user input. This component uses Material-UI components for UI elements and Handlebars for generating SQL templates.

## Features

- Dynamic SQL generation based on form input.
- Copy generated SQL to clipboard.
- Form validation for necessary fields.

## Installation

Ensure you have the following dependencies in your project:

- `react`
- `@mui/material`
- `handlebars`

## Usage

To use the `ObjectFieldInfoForm` component in your project, follow these steps:

1. Import the component:
   ```jsx
   import ObjectFieldInfoForm from "path-to-ObjectFieldInfoForm";
   ```
