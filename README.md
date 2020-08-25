# The Mary Hare Taylor Knight Memorial Columbarium <br> - Management Portal
 * Developing a working map and back-end management system for a small columbarium. 
<hr> 
<img src="https://www.stmartinec.org/uploads/images/20200611-columbarium-cross-after-1a-square_303_medium.jpg" 
    style="height: 200px; width: 200px; float:right"/>
<h3>    
"The Mary Hare Taylor Knight Memorial Columbarium on St. Martin’s grounds, is available for those who plan to be cremated. This beautiful, sacred space is tucked between the sanctuary and attached Mary Chapel, on a quiet, inside portion of our grounds. Lovingly maintained by volunteer gardeners and landscapers, as well as our sexton, this is an enduring place for your family and friends to return to for comfort and memory."
 
<a href="https://www.stmartinec.org/columbarium/">Church website</a>
 <br><br><br>
 </h3>

<hr>
<br>
Until recently, the management of the Mary Hare Taylor Knight Memorial Columbarium had been managed only on paper. This was changed when the columbarium celebrated an anniversary, and some of the information stored in books was transferred to several Excel documents. I was asked to help modernize the process of viewing the plots with a visual tool that could be public-facing, as well as designing a management portal that could be used by the church administration to help maintain accurate records for the organization. 

Using mySQL I built a database to help maintain the data going forward, as well as manage any new additions to the memorial garden. Using a Create-React-App shell and style and components from material-ui I built a front-end and pulled colors from the primary Saint Martin's website to make sure my colors and font's matched the main site, so that anyone visiting this columbarium tool would feel like this is an extension of the main website. I found a really nice interactive map tool that allowed me to put zooming and dragging onto the map so it behaved like a Google Map-like interface, and I color coded the squares for each item in the map and included a drawer menu with a legend. 
<p>
<img src = "readme_images\Map.png">
<br>

There is a basic search tool to find via name or via plot number, and the plots have the ability to contain a picture, so that a picture of the headstone is viewable from within the tool. 

<table>
<tr>
<td> <img src="readme_images\Plot_Search.png"></td>
<td> <img src="readme_images\Name_Search.png"></td>
</tr>
</table>

