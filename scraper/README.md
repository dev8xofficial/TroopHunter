To manage the installed Python packages locally within your project directory, you should use a virtual environment. A virtual environment is a self-contained directory that contains its own Python interpreter and installed packages. This allows you to isolate your project's dependencies from the global Python environment.

You can create a virtual environment in your project directory using the following steps:

1. Navigate to your project directory in the terminal:

```bash
cd /path/to/your/project
```

2. Install the `virtualenv` package if you haven't already:

```bash
python3 -m pip install virtualenv
```

3. Create a virtual environment in your project directory (you can choose a different name if you prefer):

```bash
virtualenv venv
```

Or

```bash
python3 -m pip venv venv
```

Or

```bash
python3 -m virtualenv venv
```

4. Activate the virtual environment:

On macOS/Linux:

```bash
source venv/bin/activate
```

On Windows:

```bash
venv\Scripts\activate
```

5. Once the virtual environment is activated, you will see `(venv)` at the beginning of your terminal prompt, indicating that you are now working in the virtual environment.

6. Install the required packages for your project within the virtual environment:

```bash
python3 -m pip install package_name
```

Replace `package_name` with the name of the package you want to install for your project.

7. To deactivate the virtual environment and return to the global Python environment, use the following command:

```bash
deactivate
```

By using a virtual environment, you can keep your project's dependencies isolated from the global Python environment and manage them locally within your project directory. This helps avoid conflicts between different projects and ensures that each project has its own set of dependencies.

Additionally, you can create a `requirements.txt` file in your project directory to list all the packages required for your project. This file can be used to recreate the virtual environment and install all the necessary packages on another system:

```bash
python3 -m pip freeze > requirements.txt -t .
```

To install the packages listed in the `requirements.txt` file on another system, run:

```bash
python3 -m pip install -r requirements.txt -t .
```

Remember to keep your `requirements.txt` file updated whenever you add or remove packages from your project.

Using virtual environments and managing project-specific dependencies is a best practice in Python development, especially when working on multiple projects with different package requirements.

Helper commands:

```bash
python3 -m pip install -r requirements.txt -t .
python3 -m pip install --upgrade -r requirements.txt -t .
python3 -m pip list
python3 -m pip uninstall package_name -t .

git rm -r --cached folder_name
git rm -r --cached \*\*/**pycache**/\*
```
