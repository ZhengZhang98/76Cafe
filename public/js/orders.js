/**
 * Created by Zabrina on 2018-01-21.
 */
var mymodule = angular.module('myModule', []);

mymodule.controller('ctrlRead', function ($scope, $filter, $http, $route) {
  
  // init
  $scope.sort = {
    sortingOrder : 'id',
    reverse : false
  };
  $scope.gap = 5;
  $scope.filteredItems = [];
  $scope.groupedItems = [];
  $scope.itemsPerPage = 5;
  $scope.pagedItems = [];
  $scope.currentPage = 0;
  
  
  var searchMatch = function (haystack, needle) {
    if (!needle) {
      return true;
    }
    return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
  };
  
  // init the filtered items
  $scope.search = function () {
    $scope.filteredItems = $filter('filter')($scope.items, function (item) {
      for(var attr in item) {
        if (searchMatch(item[attr], $scope.query))
          return true;
      }
      return false;
    });
    // take care of the sorting order
    if ($scope.sort.sortingOrder !== '') {
      $scope.filteredItems = $filter('orderBy')($scope.filteredItems, $scope.sort.sortingOrder, $scope.sort.reverse);
    }
    $scope.currentPage = 0;
    // now group by pages
    $scope.groupToPages();
  };
  
  
  // calculate page in place
  $scope.groupToPages = function () {
    $scope.pagedItems = [];

    for (var i = 0; i < $scope.filteredItems.length; i++) {
      if (i % $scope.itemsPerPage === 0) {
        $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [ $scope.filteredItems[i] ];
      } else {
        $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
      }
    }
  };
  
  $scope.range = function (size,start, end) {
    var ret = [];
    //console.log(size,start, end);
    
    if (size < end) {
      end = size;
      start = size-$scope.gap;
      if(start < 0){
        start = 0;
      }
    }
    for (var i = start; i < end; i++) {
      ret.push(i);
    }
    return ret;
  };
  
  $scope.prevPage = function () {
    if ($scope.currentPage > 0) {
      $scope.currentPage--;
    }
  };
  
  $scope.nextPage = function () {
    if ($scope.currentPage < $scope.pagedItems.length - 1) {
      $scope.currentPage++;
    }
  };
  
  $scope.setPage = function () {
    $scope.currentPage = this.n;
  };
  
  $scope.finished = function(id){
    $http({
      method : "POST",
      url : "/api/delete/"+id
    }).then(function mySuccess(response) {
      alert("Order finished");
      $scope.refresh();
    });
  };
  
  $scope.refresh = function(){
    $http.get('/api/order').then(function mySuccess(response) {
      $scope.items = response.data;
      $scope.search();
    }, function myError(response){
      alert("Error");
    });
  };
  
  $scope.refresh();
  
});


mymodule.$inject = ['$scope', '$filter'];

mymodule.directive("customSort", function() {
  return {
    restrict: 'A',
    transclude: true,
    scope: {
      order: '=',
      sort: '='
    },
    template :
    ' <a ng-click="sort_by(order)" style="color: #555555;">'+
    '    <span ng-transclude></span>'+
    '    <i ng-class="selectedCls(order)"></i>'+
    '</a>',
    link: function(scope) {
      
      // change sorting order
      scope.sort_by = function(newSortingOrder) {
        var sort = scope.sort;
        
        if (sort.sortingOrder == newSortingOrder){
          sort.reverse = !sort.reverse;
        }
        
        sort.sortingOrder = newSortingOrder;
      };
      
      
      scope.selectedCls = function(column) {
        if(column == scope.sort.sortingOrder){
          return ('icon-chevron-' + ((scope.sort.reverse) ? 'down' : 'up'));
        }
        else{
          return'icon-sort'
        }
      };
    }
  }
});
