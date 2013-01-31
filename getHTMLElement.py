import lxml.html
import urllib2
import sys

#import pdb
#pdb.set_trace()

pages = []

url = ''

f = open(sys.argv[1])

for url in iter(f):
    print url
    pages.append(urllib2.urlopen(url).read().decode('utf-8'))

for page in pages:
    html = lxml.html.fromstring(page)
    name = html.find(".//h1").text_content()
    print name