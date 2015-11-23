Package.describe({
    name: '255kb:md-snackbars',
    version: '1.3.1',
    summary: 'Snackbars and Toasts based on Google\'s Material Design',
    git: 'https://github.com/255kb/md-snackbars',
    documentation: 'README.md'
});

Package.onUse(function(api) {
    api.versionsFrom('1.0');
    api.use(['jquery'], 'client');
    api.addFiles(['dist/md-snackbars.js', 'dist/md-snackbars.css'], 'client');
    api.export(['MDSnackbars']);
});