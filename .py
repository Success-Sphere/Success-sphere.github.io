import os
import re

def remove_get_auth_script_tags(root_dir):
    # Regex to match script tags referencing get-auth.js
    script_regex = re.compile(
        r'<script\b[^>]*?src=["\']?[^"\'>]*get-auth\.js[^"\'>]*["\']?[^>]*?>.*?</script\s*>',
        re.IGNORECASE | re.DOTALL
    )

    # File extensions to process
    exts = ('.html', '.htm', '.js')

    for subdir, _, files in os.walk(root_dir):
        for filename in files:
            if filename.lower().endswith(exts):
                filepath = os.path.join(subdir, filename)
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                new_content = script_regex.sub('', content)
                if new_content != content:
                    print(f"Cleaned: {filepath}")
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(new_content)

if __name__ == "__main__":
    # Change '.' to your target directory if needed
    remove_get_auth_script_tags('.')
