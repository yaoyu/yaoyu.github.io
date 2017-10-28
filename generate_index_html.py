#!/usr/bin/env python
# -*- coding:utf-8 -*-
'''index.html生成工具

说明:
    查找目录(及子目录)下所有html文件, 生成link

历史:
    0.01 姚彧 2017-10-28 简单生成索引,便于查找文件
'''

import os
from helper.file_helper import *

def html_file_get_title(filename):
    assert (os.path.isfile(filename)), filename
    content = yy_file_read_nbytes(filename, 400)
    content = content.split(b'title>')
    title = content[1].strip()[:-2].decode()
    assert title
    return title


def find_html_files(basedir): 
    files = []
    def html_file_visitor(file):
        if file[-5:].lower() == '.html':
            filename = os.path.basename(file)
            if filename[:-5].lower() != 'index':
                title = html_file_get_title(file)
                files.append({'title': title, 'file': file.replace(basedir, '')[1:].replace('\\', '/')})
    yy_visit_dir_files(basedir, html_file_visitor)
    return files 


def build_html_file_links_html(html_files): 
    html_links = ['<ol>']
    for file in html_files:
        html_links.append('<li><a href="{file}">{title}</a></li>'.format(**file))
    html_links.append('</ol>')
    return '\n'.join(html_links)

if __name__ == '__main__':
    def main(): 
        basedir = os.path.abspath(os.path.dirname(__file__)+ '\\')
        index_name = 'index'
        index_template = yy_file_read_content(os.path.join(basedir, index_name + '.template')).replace('\r', '')
        html_files = find_html_files(basedir)
        link_files_html = build_html_file_links_html(html_files)
        index_html = index_template.replace('{{link_files}}', link_files_html)
        yy_file_write_content(os.path.join(basedir, index_name + '.html'), index_html)
        
        
    main()