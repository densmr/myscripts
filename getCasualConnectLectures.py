import lxml.html
import urllib2
import sys

#import pdb
#pdb.set_trace()

pages = []

url = 'http://europe.casualconnect.org/content.html'

pages.append(urllib2.urlopen(url).read().decode('utf-8'))

for page in pages:
    html = lxml.html.fromstring(page)
    names = html.findall('.//h5[@class="speaker"]')


for name in names:
    company = name.find('.//em')
    if company is not None:
    	print company.text_content()