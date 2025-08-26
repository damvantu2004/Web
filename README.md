# Django Habit Tracker

A comprehensive web application for tracking personal habits with advanced analytics and administrative capabilities.

## Distinctiveness and Complexity

### Distinctiveness

This Habit Tracker application is distinctly different from the other course projects in several fundamental ways:

**Not a Social Network**: Unlike Project 4, this application focuses on personal habit management rather than social interactions. There are no user-to-user connections, posts, following systems, or social features. Each user manages their own private habits and progress without any social component.

**Not E-commerce**: While this application has user accounts and data management, it is not an e-commerce platform like Project 2. There are no products, shopping carts, payments, or commercial transactions. The focus is entirely on personal productivity and habit formation tracking.

**Unique Domain Focus**: This application addresses the specific domain of habit formation and behavioral psychology, implementing concepts like streak tracking, completion rates, and behavioral analytics that are not present in any other course project.

**Administrative System**: Features a sophisticated dual-role system where regular users manage personal habits while administrators oversee system-wide analytics and user management, creating a unique administrative layer not found in other projects.

### Complexity

The application demonstrates significant complexity across multiple dimensions:

**Backend Complexity**:
- **Advanced Django Models**: Complex model relationships with custom methods for calculating streaks, completion rates, and behavioral metrics
- **Sophisticated Analytics**: Mathematical algorithms for habit analytics including current streak calculations, completion rate computations, and trend analysis
- **Role-Based Access Control**: Dual dashboard system with different interfaces and permissions for users vs administrators
- **Data Aggregation**: Complex database queries with aggregation functions for generating statistics across multiple time periods

**Frontend Complexity**:
- **Interactive Calendar System**: Custom JavaScript calendar component with color-coded habit tracking visualization
- **Dynamic Data Loading**: AJAX-powered calendar that dynamically loads habit data for different months and years
- **Chart.js Integration**: Multiple interactive charts (pie charts, bar charts) for visualizing habit statistics and trends
- **Mobile-Responsive Design**: Complex CSS grid and flexbox layouts that adapt seamlessly across all device sizes

**JavaScript Features**:
- **Calendar Visualization**: Custom calendar component with date-based habit completion visualization
- **Real-time Updates**: Dynamic habit check-in system with immediate visual feedback
- **Chart Rendering**: Integration with Chart.js for multiple chart types displaying habit analytics
- **AJAX Communication**: Asynchronous data loading for calendar views and habit updates

**Database Design**:
- **Three Related Models**: User profiles, habits with categories, and check-ins with complex relationships
- **Custom Model Methods**: Advanced Python methods for calculating streaks, completion rates, and analytics
- **Data Integrity**: Unique constraints and automated completion logic based on target values

## Features

### User Features
- **Habit Creation & Management**: Create habits with custom categories, frequencies, and target values
- **Daily Check-ins**: Log habit completion with notes and progress tracking
- **Visual Calendar**: Interactive calendar showing habit completion status with color coding
- **Streak Tracking**: Automatic calculation of current streaks and historical performance
- **Analytics Dashboard**: Personal statistics with completion rates and trend analysis
- **Profile Management**: User profiles with avatars and personal information

### Administrative Features
- **System Overview**: Comprehensive dashboard showing system-wide statistics
- **User Management**: Monitor all user accounts and their habit activities
- **Analytics**: System-wide analytics and user engagement metrics
- **Data Oversight**: View and manage all habits and check-ins across the platform

### Technical Features
- **Mobile Responsive**: Fully responsive design working on all device sizes
- **Real-time Updates**: Dynamic content updates without page refreshes
- **Data Visualization**: Multiple chart types for habit analytics
- **Secure Authentication**: Complete user authentication system with role-based access

## File Structure and Contents

### Core Django Files

**`manage.py`**: Standard Django management script for running the application.

**`habit_tracker/settings.py`**: Main Django settings file containing database configuration, installed apps, middleware, and static file settings.

**`habit_tracker/urls.py`**: Root URL configuration routing to different app URLs.

### Applications

#### `habits/` - Core Habit Management
- **`models.py`**: Contains three main models:
  - `Category`: Habit categories with colors for organization
  - `Habit`: Main habit model with frequency, targets, and custom analytics methods
  - `CheckIn`: Daily check-in records with completion tracking
- **`views.py`**: Handles all habit-related views including CRUD operations, calendar data API, and statistics generation
- **`forms.py`**: Django forms for habit creation and editing with custom validation
- **`urls.py`**: URL patterns for habit management endpoints
- **`admin.py`**: Django admin configuration for habit management

#### `accounts/` - User Management
- **`models.py`**: Extended user profile model with additional fields (bio, phone, avatar)
- **`views.py`**: User authentication, registration, profile management, and account deletion
- **`forms.py`**: Custom user registration and profile forms with validation
- **`signals.py`**: Django signals for automatic user profile creation
- **`urls.py`**: Authentication and profile management URLs

#### `dashboard/` - Analytics and Overview
- **`views.py`**: Contains two main dashboard views:
  - User dashboard with personal habit statistics and progress
  - Admin dashboard with system-wide analytics and user management
- **`urls.py`**: Dashboard routing for different user roles

### Templates

#### `templates/base.html`
Main template containing:
- Bootstrap 5 integration for responsive design
- Chart.js library for data visualization
- Role-based navigation with admin indicators
- Mobile-responsive navbar with proper authentication handling

#### `templates/habits/`
- **`habit_list.html`**: Displays all user habits with filtering and search
- **`habit_detail.html`**: Individual habit view with calendar, statistics, and check-in interface
- **`habit_form.html`**: Habit creation and editing form
- **`statistics.html`**: Comprehensive habit analytics with multiple chart types

#### `templates/dashboard/`
- **`dashboard.html`**: User dashboard with personal statistics and recent activity
- **`admin_dashboard.html`**: Administrator interface with system overview and user management

#### `templates/accounts/`
- **`login.html`**, **`signup.html`**: Authentication forms
- **`profile.html`**: User profile management
- **`delete_account.html`**: Account deletion confirmation

### Static Files

#### `static/css/style.css`
Custom CSS containing:
- Responsive design utilities
- Calendar visualization styles
- Card layouts and animations
- Mobile-specific optimizations
- Custom color schemes for habit categories

#### `static/js/script.js`
JavaScript functionality including:
- Interactive calendar component (378 lines)
- AJAX handlers for dynamic data loading
- Chart.js integration for analytics
- Bootstrap component initialization
- Mobile touch event handlers

### Configuration Files

**`requirements.txt`**: Python dependencies including Django 4.2.7, Pillow for image handling, crispy-forms for form styling, and other essential packages.

**`.env.example`**: Template for environment variables including secret keys and database configuration.

**`setup.bat`** and **`setup.sh`**: Automated setup scripts for Windows and Unix systems.

## How to Run the Application

### Prerequisites
- Python 3.8 or higher
- pip package manager

### Installation Steps

1. **Clone and navigate to the project directory**:
```bash
cd habit_tracker
```

2. **Create and activate virtual environment**:
```bash
python -m venv habit_env
# On Windows:
habit_env\Scripts\activate
# On macOS/Linux:
source habit_env/bin/activate
```

3. **Install dependencies**:
```bash
pip install -r requirements.txt
```

4. **Set up environment variables**:
   - Copy `.env.example` to `.env`
   - Update the secret key and other settings as needed

5. **Initialize the database**:
```bash
python manage.py makemigrations
python manage.py migrate
```

6. **Create a superuser account**:
```bash
python manage.py createsuperuser
```

7. **Run the development server**:
```bash
python manage.py runserver
```

8. **Access the application**:
   - Open your browser and go to `http://127.0.0.1:8000/`
   - Register a new user account or login with existing credentials
   - Access admin features at `http://127.0.0.1:8000/admin/` with superuser credentials

### Quick Setup (Automated)
For Windows users, you can use the automated setup:
```bash
setup.bat
```

## Additional Information

### User Roles
- **Regular Users**: Can create and manage personal habits, track daily progress, and view personal analytics
- **Administrators**: Have access to system-wide statistics, user management, and all regular user features

### Database Design
The application uses SQLite for development with three main models:
- Users have profiles with extended information
- Habits belong to users and can have categories
- Check-ins track daily habit completion with timestamps

### Mobile Responsiveness
The application is fully responsive using Bootstrap 5 with custom CSS optimizations for:
- Touch-friendly interface elements
- Optimized calendar view for small screens
- Collapsible navigation for mobile devices
- Responsive chart scaling

### Browser Compatibility
Tested and optimized for:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

### Security Features
- Django's built-in CSRF protection
- User authentication and authorization
- Role-based access control
- Secure password handling
- SQL injection protection through Django ORM

This Habit Tracker application represents a comprehensive solution for personal productivity tracking with sophisticated analytics, role-based administration, and a modern, responsive user interface.
