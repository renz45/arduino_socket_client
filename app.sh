#!/bin/sh

basedir=`dirname "$0"`
$basedir/node $basedir/app.js & wait
