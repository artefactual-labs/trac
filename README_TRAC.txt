This tarball contains a Drupal application as well as a SQL script that
populates the accompanying database. Please see the deployment steps below
for specific notes and things to change.

Most modules, and Drupal core, were current as of August 30th, 2013. The
site has been built upon release 7.23. Other module release versions can
be seen in the config report. The application is smallish, with 19 contrib
modules and only one theme.

PLEASE NOTE: As I was updating this document in preparation for release,
I noticed that an update to Field Group was released out of cycle (August
29th). This release has not been reflected in this tarball, and should
be evaluated by whomever implements this application. Additionally, the
Bootstrap theme is slightly behind, largely because I have not reviewed the
latest changes and reconciled them with my custom CSS and function. The next
release will probably include a sub-theme for these tweaks, but that didn't
get addressed this time around.

The biggest change has been to the CSS styles, although there is a function
in template.php that can be used to tweak the appearance of some form fields
on the node edit screen. I've disabled that function in this release,
as it has proven somewhat finicky in my testing and should probably be
reviewed by someone wherever the application is implemented. The function
is blah_form_element, beginning on line 303. I've included a reference in
the code to the thread on Drupal.org that discusses the feature I attempted
to implement.

System Prerequisites: =================

The system must have Apache 2 installed and mod_rewrite access enabled.
Also recommended is having the PHP GD and uploadstatus extensions installed.

Ubuntu-specific instructions for enabling mod_rewrite:

  1. Enter "sudo a2enmod rewrite" into the command-line.

  2. Edit the file /etc/apache2/sites-enabled/000-default changing
     "AllowOverride None" to "AllowOverride All" in the "<Directory /var/www/>"
     section.

  3. Enter "service apache2 restart" into the command-line.

Ubuntu-specific instructions for enabling the PHP GD extension:

  1. Enter "sudo apt-get install php5-gd" into the command-line.

  2. Enter "service apache2 restart" into the command-line.

Ubuntu-specific instrructions for enabling the PHP uploadstatus extension:

  1. Enter the following commands into the command-line:

     sudo apt-get install php-pear build-essential
     sudo pecl install uploadprogress
     echo "extension=uploadprogress.so" > /etc/php5/conf.d/uploadprogress.ini

  2. Enter "service apache2 restart" into the command-line.

You can verify the PHP extensions have been correctly installed by checking the
status report page. When logged in as admin, select "Status report" in the
"Reports" pull-down menu.

Deployment Steps: =================

In order to deploy this application at your institution, the following things
should be checked:

1) Import that database via the SQL script. It will import into a 'trac'
database, which must be created beforehand.

2) Unpack the tarball into your chosen hosting environment. There may
need to be some fiddling to get the relevant links to work - at MIT we run
the application inside a /trac directory on a larger server, so there are
hard-coded links to that directory in some of the Basic Page nodes.

3) The database connection needs to be specified in the usual place (
/sites/default/settings.php )

4) There are three user accounts on the application, one for "admin" (user
1), an "editor", and an "auditor". The passwords for each are set to the
username - so obviously this is something that should be changed immediately.

5) The text in the footer of every page about requesting an alternate format
needs to be customized for your institution. This can be done by editing
its block: /admin/structure/block/manage/block/2/configure

Thanks, Matt Bernhardt mjbernha@mit.edu @morphosis7
