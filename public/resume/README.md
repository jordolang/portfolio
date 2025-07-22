# Interactive Terminal Portfolio

A modular, interactive command-line portfolio showcasing professional skills, experience, and projects with styled terminal output and engaging user experience.

## 🌟 Features

### **Modular Content Sections**
- **Introduction**: ASCII art welcome banner, professional bio, and navigation guide
- **Resume**: Comprehensive skills matrix, experience statistics, and professional timeline
- **Projects**: Formatted showcase of 6 featured projects with descriptions and tech stacks
- **Contact**: Complete contact information with social links and call-to-action
- **Bonus Extras**: Diagnostic utilities and system information tools

### **Professional Terminal UI**
- Colored headers and borders for visual appeal
- Consistent formatting throughout all sections
- Typewriter effects for engaging text display
- **Arrow key navigation** with visual menu selection
- Cross-platform terminal compatibility (Windows, macOS, Linux)

### **Technical Highlights**
- **Modular Architecture**: Each section is a separate function for easy maintenance
- **Color System**: Comprehensive color scheme for terminal styling
- **Error Handling**: Graceful handling of user input and system interrupts
- **Responsive Design**: Adapts to different terminal widths
- **Professional Documentation**: Inline comments and type hints

## 🚀 Quick Start

### Installation
```bash
git clone <repository-url>
cd resume
chmod +x portfolio.py
```

### Running the Portfolio
```bash
./portfolio.py
# or
python3 portfolio.py
```

## 🎮 Navigation System

### **Arrow Key Navigation**
The portfolio features an intuitive arrow key navigation system:

- **↑/↓ Arrow Keys**: Navigate up and down through menu items
- **Enter**: Select the highlighted menu option
- **Q**: Quick quit from any menu
- **Ctrl+C**: Emergency exit

### **Visual Menu Interface**
- **Selected Item**: Highlighted with ► symbol and colored text
- **Menu Items**: Display with icons, names, and descriptions
- **Status Indicators**: Real-time feedback on current selection

### **Navigation Flow**
1. **Welcome Screen**: Initial ASCII art and introduction
2. **Main Menu**: Arrow key navigation between sections
3. **Section Views**: Display content with "Press any key to return" prompt
4. **Return to Menu**: Automatic return to main navigation

## 📋 Section Details

### Introduction Section
- **ASCII Art Banner**: Eye-catching portfolio logo
- **Professional Bio**: Concise introduction with key strengths
- **Navigation Instructions**: Clear command guidance
- **Typewriter Effect**: Engaging text animation

### Resume Section
- **Skills Matrix**: Organized by category (Frontend, Backend, Databases, DevOps, Tools)
- **Emerging Skills**: Technologies currently learning
- **Experience Statistics**: Quantified professional metrics
- **Professional Timeline**: Detailed career progression with achievements

### Projects Section
- **6 Featured Projects**: Curated selection of work
- **Project Cards**: Formatted displays with:
  - Comprehensive descriptions
  - Technology stack listings
  - Key highlights and achievements
  - Status indicators (Completed, Active, In Development, Planning, Concept)
- **Project Insights**: Meta-commentary on development approach

### Contact Section
- **Multiple Contact Methods**: Email, LinkedIn, GitHub, Twitter, Phone
- **Professional Opportunities**: Clear description of interests
- **Call-to-Action**: Encouraging collaboration message
- **Response Time Promise**: Professional communication standards

### Bonus Extras Section
- **System Diagnostics**: Current system information
- **Color Compatibility Test**: Terminal color support verification
- **Network Connectivity Check**: Internet connection validation
- **Future Utilities**: Placeholder for additional diagnostic tools

## 🎨 Design System

### Color Palette
- **Header**: Magenta (`\033[95m`)
- **Success/Positive**: Green (`\033[92m`)
- **Information**: Blue (`\033[94m`)
- **Warning/Highlight**: Yellow (`\033[93m`)
- **Error**: Red (`\033[91m`)
- **Accent**: Cyan (`\033[96m`)

### Typography
- **Bold**: Important headings and emphasis
- **Regular**: Body text and descriptions
- **Colored**: Categorical information and status indicators

### Layout
- **80-character width**: Consistent terminal formatting
- **Bordered sections**: Clear visual separation
- **Hierarchical structure**: Logical information organization
- **Consistent spacing**: Professional appearance

## 🛠️ Technical Implementation

### Core Components
```python
class Colors:           # Terminal color code definitions
def clear_screen():     # Cross-platform screen clearing
def print_border():     # Decorative border printing
def print_section_header(): # Formatted section headers
def typewriter_effect(): # Text animation effect
```

### Section Functions
```python
def show_introduction(): # ASCII art and bio
def show_resume():       # Skills and experience
def show_projects():     # Project portfolio
def show_contact():      # Contact information
def show_bonus_extras(): # Utilities section
```

### Navigation System
```python
def main():             # Primary program loop
def get_user_input():   # Command input handling
def show_main_menu():   # Navigation interface
```

## 🔧 Customization

### Adding New Sections
1. Create a new function following the naming pattern: `show_new_section()`
2. Add the function to the `commands` dictionary in `main()`
3. Update the main menu items list
4. Follow the established formatting patterns

### Modifying Content
- **Skills**: Update the `core_skills` and `emerging_skills` dictionaries
- **Projects**: Modify the `get_featured_projects()` function return data
- **Contact**: Update contact information in `show_contact()`
- **Experience**: Modify timeline data in `show_professional_journey()`

### Styling Changes
- **Colors**: Modify the `Colors` class constants
- **Borders**: Adjust `print_border()` parameters
- **Layout**: Update width parameters in formatting functions

## 📋 Requirements

- **Python 3.6+**: Modern Python with f-string support
- **Terminal**: Any ANSI color-compatible terminal
- **Operating System**: Cross-platform (Windows, macOS, Linux)

## 🔒 Dependencies

- **Standard Library Only**: No external package requirements
- **Built-in Modules**: `os`, `sys`, `time`, `datetime`, `typing`, `platform`, `urllib.request`

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for:
- New utility functions for the extras section
- Enhanced styling and formatting options
- Additional navigation features
- Bug fixes and improvements

## 📞 Support

For questions, suggestions, or collaboration opportunities, please use the contact information provided in the portfolio's contact section.

---

**Built with ❤️ and ☕ by Jordan Lang**
