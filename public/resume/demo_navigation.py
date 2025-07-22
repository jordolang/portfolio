#!/usr/bin/env python3
"""
Quick Demo of Arrow Key Navigation System
Shows how the menu selection works without running the full portfolio.
"""

import os
import sys
import termios
import tty

# Color codes for demo
class Colors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    CYAN = '\033[96m'
    WHITE = '\033[37m'

def clear_screen():
    """Clear the terminal screen."""
    os.system('cls' if os.name == 'nt' else 'clear')

def get_single_keypress():
    """Get a single keypress from stdin without pressing Enter."""
    if os.name == 'nt':  # Windows
        import msvcrt
        key = msvcrt.getch()
        if key == b'\xe0':  # Special key prefix on Windows
            key = msvcrt.getch()
            if key == b'H':  # Up arrow
                return 'UP'
            elif key == b'P':  # Down arrow
                return 'DOWN'
        elif key == b'\r':  # Enter
            return 'ENTER'
        return key.decode('utf-8', errors='ignore')
    else:  # Unix/Linux/macOS
        fd = sys.stdin.fileno()
        old_settings = termios.tcgetattr(fd)
        try:
            tty.setraw(sys.stdin.fileno())
            key = sys.stdin.read(1)
            
            if key == '\x1b':  # ESC sequence
                key += sys.stdin.read(2)
                if key == '\x1b[A':  # Up arrow
                    return 'UP'
                elif key == '\x1b[B':  # Down arrow
                    return 'DOWN'
                return 'ESC'
            elif key == '\r' or key == '\n':  # Enter
                return 'ENTER'
            elif key == '\x03':  # Ctrl+C
                raise KeyboardInterrupt
            return key
        finally:
            termios.tcsetattr(fd, termios.TCSADRAIN, old_settings)

def display_demo_menu(menu_items, selected_index=0):
    """Display a demo navigation menu."""
    clear_screen()
    
    print(f"{Colors.BOLD}{Colors.HEADER}{'═' * 60}{Colors.ENDC}")
    print(f"{Colors.BOLD}{Colors.HEADER}║        ARROW KEY NAVIGATION DEMO         ║{Colors.ENDC}")
    print(f"{Colors.BOLD}{Colors.HEADER}{'═' * 60}{Colors.ENDC}")
    print()
    
    print(f"{Colors.BOLD}Use ↑/↓ arrow keys to navigate, Enter to select, 'q' to quit:{Colors.ENDC}\n")
    
    for i, (icon, name, description) in enumerate(menu_items):
        if i == selected_index:
            # Highlight selected item
            print(f"  {Colors.BOLD}{Colors.HEADER}► {icon} {name}{Colors.ENDC}")
            print(f"    {Colors.CYAN}{description}{Colors.ENDC}")
        else:
            # Regular item
            print(f"  {Colors.OKGREEN}  {icon} {name}{Colors.ENDC}")
            print(f"    {Colors.WHITE}{description}{Colors.ENDC}")
        print()  # Add spacing between items

def run_demo():
    """Run the navigation demo."""
    menu_items = [
        ("👋", "Introduction", "Welcome & Bio - Get to know me and my background"),
        ("📋", "Resume", "Skills & Experience - Technical skills and professional journey"),
        ("💼", "Projects", "Featured Projects - Portfolio of completed and ongoing work"),
        ("📧", "Contact", "Contact Information - Get in touch for opportunities"),
        ("🛠️", "Utilities", "Bonus Extras - Diagnostic tools and system utilities"),
        ("❌", "Exit", "Quit Demo - Thanks for trying!")
    ]
    
    selected = 0
    
    print(f"{Colors.OKGREEN}Welcome to the Arrow Key Navigation Demo!{Colors.ENDC}")
    print(f"This demonstrates the navigation system used in the portfolio.")
    print(f"Press any key to start the demo...")
    get_single_keypress()
    
    while True:
        display_demo_menu(menu_items, selected)
        
        try:
            key = get_single_keypress()
            
            if key == 'UP':
                selected = (selected - 1) % len(menu_items)
            elif key == 'DOWN':
                selected = (selected + 1) % len(menu_items)
            elif key == 'ENTER':
                clear_screen()
                item_name = menu_items[selected][1]
                if item_name == "Exit":
                    print(f"{Colors.HEADER}Thanks for trying the demo!{Colors.ENDC}")
                    print(f"{Colors.OKGREEN}Run './portfolio.py' to see the full portfolio! 👋{Colors.ENDC}")
                    break
                else:
                    print(f"{Colors.BOLD}You selected: {Colors.HEADER}{item_name}{Colors.ENDC}")
                    print(f"{Colors.CYAN}{menu_items[selected][2]}{Colors.ENDC}\n")
                    print(f"In the real portfolio, this would show the {item_name.lower()} section.")
                    print(f"\n{Colors.WARNING}Press any key to return to the demo menu...{Colors.ENDC}")
                    get_single_keypress()
            elif key.lower() == 'q':
                break
                
        except KeyboardInterrupt:
            break
    
    clear_screen()
    print(f"{Colors.HEADER}Demo completed!{Colors.ENDC}")
    print(f"{Colors.OKGREEN}The full portfolio features the same navigation system with rich content.{Colors.ENDC}")

if __name__ == "__main__":
    run_demo()
