define([
  "app",
  "api",
  "react"
  ], function(app,FauxtonAPI, React){


    //my variable
    var lineObjs = [];
    var nodeObjs = [];
    // ---------------

    var grid = 50;
    var scale = 7;
    var r = 1;

    var LinesBox = React.createClass({
      render: function(){
        // console.log("LinesBox Hit");
        return (
          <g>
            {
              this.props.data.map(function (element, i) {
                return <Line key={i} data={element}/>;
              })
            }
          </g>
          );
      }
    });

    var CirclesBox = React.createClass({

      render: function(){
        return (
          <g>
            {
              this.props.data.map(function (element, i){
                return <Circle key={i} data={element}/>;
              })
            }
          </g>
          );
      }
    });

    var Circle = React.createClass({
      render: function(){
        console.log("Circle Hit:");
        var cx = this.props.data.x;
        var cy = this.props.data.y;
        var r = 15;
        var classVal = this.props.data.class;

        return (
          <circle cx={cx} cy={cy} r={r} className={classVal}>{this.props.children}</circle>
          );
      }
    });

    var Line = React.createClass({
      render: function(){
        // console.log("Line Hit");
        // console.log(this.props.data);
        var x1 = this.props.data.x;
        var y1 = this.props.data.y;
        var x2 = this.props.data.nextX;
        var y2 = this.props.data.nextY;
        // console.log(x1);


        return (
          <line x1={x1} y1={y1} x2={x2} y2={y2}>{this.props.children}</line>
          );
      }
    });

    var TextsBox = React.createClass({
      render: function(){
        return (
          <g>{this.props.children}</g>
          );
      }
    });

    var SVGComponent = React.createClass({
      render: function() {
        return (
         <svg height="500" width="500">{this.props.children}
         </svg>
         );
      }
    });

    var Box = React.createClass({
      render: function(){
        return (
          <div className = "visualizeRevTree">
            Hi Dear
            {this.props.children}
          </div>
          );
      }
    });


    var draw = function(paths, deleted, winner, minUniq){

      // console.log("Draw Function Hit");
      // console.log("Paths: "+paths);
      // console.log("deleted: "+deleted);
      // console.log("winner: "+winner);
      // console.log("minUniq: "+minUniq);
      var maxX = grid;
      var maxY = grid;
        var levelCount = []; // numer of nodes on some level (pos)

        var map = {}; // map from rev to position
        // var levelCount = [];

        function drawPath(path) {
          // console.log("Draw Path Function Hit");
          for (var i = 0; i < path.length; i++) {
          // console.log("Draw Path Function For Loop: "+path); Done
            var rev = path[i];
            var isLeaf = i === 0;
            var pos = +rev.split('-')[0];

            if (!levelCount[pos]) {
              levelCount[pos] = 1;
            }
            var x = levelCount[pos] * grid;
            var y = pos * grid;

            if (!isLeaf) {
              var nextRev = path[i-1];
              var nextX = map[nextRev][0];
              var nextY = map[nextRev][1];

              if (map[rev]) {
                x = map[rev][0];
                y = map[rev][1];
              }

              //my variable
              var lineObj = {
                "x" : x,
                "y" : y,
                "nextX" : nextX,
                "nextY" : nextY
              };
          
              // console.log("Draw Path Function For Hit: "+lineObj.x+"--"+lineObj.y+"--"+lineObj.nextX+"--"+lineObj.nextY);



              lineObjs.push(lineObj);
              // console.log(lineObjs);
              //------------------------

              // line(x, y, nextX, nextY);
            }
            if (map[rev]) {
              break;
            }
            maxX = Math.max(x, maxX);
            maxY = Math.max(y, maxY);
            levelCount[pos]++;

            // //my variable
            // var nodeObj = {
            //   "x" : x,
            //   "y" : y,
            //   "isLeaf" : isLeaf,
            //   "isDeleted" : rev in deleted,
            //   "isWinner" : rev === winner,
            //   "minUniq" : minUniq
            // };

            // nodeObjs.push(nodeObj);

            node(x, y, rev, isLeaf, rev in deleted, rev === winner, minUniq);
            map[rev] = [x, y];
          }
        }
        paths.forEach(drawPath);
        // console.log(lineObjs.length);
      };

      var minUniqueLength = function(arr){
       function strCommon(a, b){
        if (a === b) return a.length;
        var i = 0;
        while(++i){
          if(a[i - 1] !== b[i - 1]) return i;
        }
      }

      var array = arr.slice(0);
      var com = 1;
      array.sort();
      for (var i = 1; i < array.length; i++){
        com = Math.max(com, strCommon(array[i], array[i - 1]));
      }
      return com;
    };

    //--------------------------------------------

    function node(x, y, rev, isLeaf, isDeleted, isWinner, shortDescLen){
      console.log("NODE HIT");
      circ(x, y, r, isLeaf, isDeleted, isWinner);
      var pos = rev.split('-')[0];
      var id = rev.split('-')[1];
      var opened = false;

      // var text = document.createElement('div');
     //  //text.style.display = "none";
     //  text.classList.add("box");
     //  text.style.left = scale * (x + 1 * r) + "px";
     //  text.style.top = scale * (y - 5) + "px";
     //  text.short = pos + '-' + id.substr(0, shortDescLen);
     //  text.long = pos + '-' + id;
     //  text.appendChild(document.createTextNode(text.short));
     //  box.appendChild(text);
    }



    // var svgNS = "http://www.w3.org/2000/svg";
    // var box = document.createElement('div'); //done
    // box.className = "visualizeRevTree"; //done
    // var svg = document.createElementNS(svgNS, "svg"); //done
    // box.appendChild(svg); //done
    // var linesBox = document.createElementNS(svgNS, "g"); //done
    // svg.appendChild(linesBox); //done
    // var circlesBox = document.createElementNS(svgNS, "g"); //done
    // svg.appendChild(circlesBox); //done
    // var textsBox = document.createElementNS(svgNS, "g"); //done
    // svg.appendChild(textsBox); //done

    var circ = function(x, y, r, isLeaf, isDeleted, isWinner) {
      // var el = document.createElementNS(svgNS, "circle");
      // el.setAttributeNS(null, "cx", x);
      // el.setAttributeNS(null, "cy", y);
      // el.setAttributeNS(null, "r", r);     

      //my variable

      console.log("x:"+x+"--- y: "+y+"---isLeaf:"+isLeaf+"---isDeleted: "+isDeleted+"---isWinner: "+ isWinner);

      var leafStat = "";

      if (isLeaf) {
        leafStat = "leaf";
      }
      if (isWinner) {
        leafStat = "winner";
      }
      if (isDeleted) {
        leafStat = "deleted";
      }      

      var nodeObj = {
        "x" : x,
        "y" : y,
        "class" : leafStat
      };

      nodeObjs.push(nodeObj);
      // circlesBox.appendChild(el); //done
      // return el;
    }; //done

    // var line = function(x1, y1, x2, y2) {
    //   var el = document.createElementNS(svgNS, "line");
    //   el.setAttributeNS(null, "x1", x1);
    //   el.setAttributeNS(null, "y1", y1);
    //   el.setAttributeNS(null, "x2", x2);
    //   el.setAttributeNS(null, "y2", y2);
    //   linesBox.appendChild(el);
    //   return el;
    // }; //done


      //--------------------------------------------

      var App = React.createClass({
        getInitialState: function() {
          return {
            lines: [],
            treeNodes: []
          };
        },
        // componentDidMount: function() {
        //   this.getDocRevisions("db1","36b3fc66c37205c5eff683bcf5002310");
        // },

        componentDidMount: function() {
          var result = [];
          var paths = [];
          var deleted = {};
          var winner = "36b3fc66c37205c5eff683bcf5002310";
          var minUniq = 0;
          $.get(app.host+"/db1/36b3fc66c37205c5eff683bcf5002310?open_revs=all&revs=true", function(rslt) {
            var data = rslt;
            if (this.isMounted()) {
              var x = data.split(/(\n|\r\n|\r)/);

              for (var i = 0; i <x.length; i++) {
                if(String(x[i]).charAt(0) == "{"){
                  // console.log((JSON.parse(x[i])));
                  result.push(JSON.parse(x[i]));
                }
              }

              // alert(result);
              var allRevs = [];
              paths = result.map(function(res) {
                // res = res.ok; // TODO: what about missing
                if (res._deleted) {
                  deleted[res._rev] = true;
                }
                var revs = res._revisions;
                revs.ids.forEach(function(id, i) {
                  var rev = (revs.start-i) + '-' + id;
                  if (allRevs.indexOf(rev) === -1) {
                    allRevs.push(rev);
                  }
                  i--;
                });
                return revs.ids.map(function(id, i) {
                  return (revs.start-i) + '-' + id;
                });
              });

              minUniq = minUniqueLength(allRevs.map(function(rev) {
                return rev.split('-')[1];
              }));

              // console.log(minUniq);
              draw(paths, deleted, winner, minUniq);     
              alert(nodeObjs);


              this.setState({
                lines: lineObjs,
                treeNodes: nodeObjs
              });
            }
          }.bind(this));
        },

//Check this later
        getDocRevisions: function(dbName,docId){
          var result = [];
          var paths = [];
          var deleted = {};
          var winner = "36b3fc66c37205c5eff683bcf5002310";
          var minUniq = 0;

          $.ajax({
            url: app.host+"/db1/36b3fc66c37205c5eff683bcf5002310?open_revs=all&revs=true",
            dataType: 'text',
            success: function(data) {
              var x = data.split(/(\n|\r\n|\r)/);

              for (var i = 0; i <x.length; i++) {
                if(String(x[i]).charAt(0) == "{"){
                  // console.log((JSON.parse(x[i])));
                  result.push(JSON.parse(x[i]));
                }
              }

              // alert(result);
              var allRevs = [];
              paths = result.map(function(res) {
                // res = res.ok; // TODO: what about missing
                if (res._deleted) {
                  deleted[res._rev] = true;
                }
                var revs = res._revisions;
                revs.ids.forEach(function(id, i) {
                  var rev = (revs.start-i) + '-' + id;
                  if (allRevs.indexOf(rev) === -1) {
                    allRevs.push(rev);
                  }
                  i--;
                });
                return revs.ids.map(function(id, i) {
                  return (revs.start-i) + '-' + id;
                });
              });

              minUniq = minUniqueLength(allRevs.map(function(rev) {
                return rev.split('-')[1];
              }));

              // console.log(minUniq);
            },
            async: false
          });
          
          draw(paths, deleted, winner, minUniq) ;
        },

        render: function(){
          console.log(this.state.lines);
          console.log(this.state.treeNodes);
         return (
          <div>
            <h1>Hello Dear</h1>
            <Box>
              <SVGComponent>
                <LinesBox data = {this.state.lines} />
                <CirclesBox data = {this.state.treeNodes} />
              </SVGComponent>
            </Box>
          </div>

          );
       }

   });


return {
  renderContent: function(el){
    React.render(<App />, el);
  }
};

});