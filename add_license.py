#!/usr/bin/env python3
# GNU AFFERO GENERAL PUBLIC LICENSE
#                        Version 3, 19 November 2007
#
#  Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>
#  Everyone is permitted to copy and distribute verbatim copies
#  of this license document, but changing it is not allowed.
#
#                             Preamble
#
#   The GNU Affero General Public License is a free, copyleft license for
# software and other kinds of works, specifically designed to ensure
# cooperation with the community in the case of network server software.
#
#   The licenses for most software and other practical works are designed
# to take away your freedom to share and change the works.  By contrast,
# our General Public Licenses are intended to guarantee your freedom to
# share and change all versions of a program--to make sure it remains free
# software for all its users.
#
#   When we speak of free software, we are referring to freedom, not
# price.  Our General Public Licenses are designed to make sure that you
# have the freedom to distribute copies of free software (and charge for
# them if you wish), that you receive source code or can get it if you
# want it, that you can change the software or use pieces of it in new
# free programs, and that you know you can do these things.
#
#   Developers that use our General Public Licenses protect your rights
# with two steps: (1) assert copyright on the software, and (2) offer
# you this License which gives you legal permission to copy, distribute
# and/or modify the software.
#
#   A secondary benefit of defending all users' freedom is that
# improvements made in alternate versions of the program, if they
# receive widespread use, become available for other developers to
# incorporate.  Many developers of free software are heartened and
# encouraged by the resulting cooperation.  However, in the case of
# software used on network servers, this result may fail to come about.
# The GNU General Public License permits making a modified version and
# letting the public access it on a server without ever releasing its
# source code to the public.
#
#   The GNU Affero General Public License is designed specifically to
# ensure that, in such cases, the modified source code becomes available
# to the community.  It requires the operator of a network server to
# provide the source code of the modified version running there to the
# users of that server.  Therefore, public use of a modified version, on
# a publicly accessible server, gives the public access to the source
# code of the modified version.
#
#   An older license, called the Affero General Public License and
# published by Affero, was designed to accomplish similar goals.  This is
# a different license, not a version of the Affero GPL, but Affero has
# released a new version of the Affero GPL which permits relicensing under
# this license.


import os
import sys
from pathlib import Path

# File extensions to process
SOURCE_EXTENSIONS = {
    ".py", ".sh", ".bash", ".c", ".cc", ".cpp", ".cxx",
    ".h", ".hpp", ".hh",
    ".cu", ".cuh",
    ".hip",
    ".java", ".js", ".ts", ".js.map", ".jsx",
    ".go", ".rs",
    ".pl", ".rb",
    ".yml", ".yaml",
    ".cmake"
}

# Directories to skip
SKIP_DIRS = {
    ".git", ".svn", ".hg",
    "build", "out", "dist",
    "__pycache__"
}


def build_comment_block(text, file_path):
    """
    Convert license text into the appropriate comment format.
    """

    ext = file_path.suffix.lower()

    hash_style = {
        ".py", ".sh", ".bash", ".pl", ".rb",
        ".yml", ".yaml"
    }

    if ext in hash_style:
        return "\n".join(f"# {line}" if line else "#" for line in text.splitlines()) + "\n\n"

    # Default C/C++ style comments
    lines = ["/*"]
    for line in text.splitlines():
        lines.append(f" * {line}")
    lines.append(" */")
    return "\n".join(lines) + "\n\n"


def process_file(file_path, license_text):
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
    except Exception:
        return False

    # License already exists
    sample = license_text.strip().splitlines()[0].strip()
    if sample and sample in content[:5000]:
        return False

    comment_block = build_comment_block(license_text, file_path)

    # Preserve shebang
    if content.startswith("#!"):
        lines = content.splitlines(True)
        new_content = lines[0] + comment_block + "".join(lines[1:])
    else:
        new_content = comment_block + content

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(new_content)

    return True


def main():
    if len(sys.argv) != 3:
        print("Usage: python add_license.py <repo_path> <license_file>")
        sys.exit(1)

    repo_path = Path(sys.argv[1]).resolve()
    license_file = Path(sys.argv[2]).resolve()

    license_text = license_file.read_text(encoding="utf-8").strip()

    updated = 0

    for root, dirs, files in os.walk(repo_path):
        dirs[:] = [d for d in dirs if d not in SKIP_DIRS]

        for fname in files:
            path = Path(root) / fname

            if path.suffix.lower() not in SOURCE_EXTENSIONS:
                continue

            if process_file(path, license_text):
                print(f"Updated: {path}")
                updated += 1

    print(f"\nDone. Updated {updated} files.")


if __name__ == "__main__":
    main()