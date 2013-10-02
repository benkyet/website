angular.module('bk-directive-fileupload', [])

.directive('fileupload', function() {
        return {
            restrict: 'E',
            templateUrl: 'directives/fileupload.tpl.html',
            scope: {
                pictures: '='
            },
            link: function(scope, elt, attrs) {
                var j = 0;
                scope.pictures = [];

                scope.readFilesAndDisplayPreview = function(files) {

                    var length = files.length;
                    for(var i = 0, f=files[i]; i<length; i++) {

                        //Check the file is an image
                        if(!f.type.match('image.*')) {
                            continue
                        };
                        var reader = new FileReader();

                        //Use a closure + immediately invoked expression because we need
                        //to keep a reference of the current id, that's j
                        reader.onload = (function(id) {
                            return function(e) {

                                var MAX_WIDTH = 600;
                                var MAX_HEIGHT = 300;

                                var img = document.createElement('img');
                                img.src = e.target.result;

                                var canvas = document.getElementById('canvas');
                                var ctx = canvas.getContext('2d');

                                var width = img.width;
                                var height = img.height;

                                if(width > height) {
                                    if(width > MAX_WIDTH) {
                                        height *= MAX_WIDTH / width;
                                        width = MAX_WIDTH;
                                    }
                                } else {
                                    if(height > MAX_HEIGHT) {
                                        width *= MAX_HEIGHT / height;
                                        height = MAX_HEIGHT;
                                    }
                                }

                                canvas.width = width;
                                canvas.height = height;
                                ctx.drawImage(img, 0, 0, width, height);

                                var dataurl = canvas.toDataURL('image/png')

                                console.log(width, height)


                                scope.$apply(scope.pictures.push(dataurl.split(',')[1]));
                                var span = document.createElement('span');
                                span.innerHTML = "<img class='by-img-middle by-margin-top-10' src='"+ dataurl +"'>" +
                                    "<br>"
                                document.getElementById('list').insertBefore(span, null);
                            }
                        })(j);
                        reader.readAsDataURL(f);

                        //Iterate through j, what we use as index iteration
                        j++;
                    }



                }

            }
        }
    })