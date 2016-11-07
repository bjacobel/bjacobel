import React, { Component } from 'react';

export default class Activity extends Component {
  render() {
    return (

<p class="post-title">Here's what I'm working on, right now:</p>
<div class="events">
</div>
<p><i>(data via the <a href="https://developer.github.com/v3/activity/events/">github public api</a>)</i></p>

<script type="text/javascript">
    $.ajax({
        url: "https://api.github.com/users/bjacobel/events/public",
        error: function (jqXHR, textStatus, errorThrown ){
            console.error(textStatus);
        },
    }).done(function(data){
        data.forEach(function(element, index, array){
            if(element.type == "PushEvent"){
                mkcommits(
                    element.created_at,
                    element.payload.commits.length,
                    element.payload.ref.slice(11),
                    element.repo.name,
                    element.payload.commits
                );
            }

        });
    });

    var mkcommits = function (timestamp, num, ref, reponame, commits){
        commit_s = (num == 1 ? "commit" : "commits");
        repolink = "<a href='https://github.com/"+reponame+"'>"+reponame+"</a>.";
        branchlink = "<a href='https://github.com/"+reponame+"/tree/"+ref+"'>"+ref+"</a>";
        timestamp = "<p class='timestamp'>"+moment(timestamp).fromNow()+"</p>"
        summary = timestamp+"<p>Pushed "+num+" "+commit_s+" to "+branchlink+" at "+repolink+"</p>";

        commits.forEach(function(element, index, array){
            summary += "<p class='code'><a href='https://github.com/"+reponame+"/commit/"+element.sha+"'>"+element.sha.slice(0,8)+"</a>: "+element.message+"</p>";
        });

        $(".events").append(summary);
    };
</script>

<style>
    .code {
        font-family:"Courier New", Courier, monospace;
        font-size:11pt;
        margin-left:10px;
    }
    .timestamp {
        font-size:9pt;
        color:#7f7f7f;
        margin-bottom:2px;
    }
    .events {
        margin-bottom: 25px;
    }
</style>
