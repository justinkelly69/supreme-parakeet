#! /usr/bin/env perl
use 5.34.0;
use utf8;

my $inFile  = './03-iso-cities-insert-copy.sql';
my $outFile = './03-iso-cities-insert.sql';

open (my $in,  '<', $inFile)  or die "Can't open <  $inFile: $!";
open (my $out, '>', $outFile) or die "Can't open < $outFile: $!";


while(my $line = <$in>) {
    if($line =~ /^\((.+)\)([,;])/) {
        say "Matched: $1";
        my $newLine = $1;
        my @newLine = split(/,/, $newLine);
        join(',', @newLine);
        shift(@newLine);
        print $out '(' . join(',', @newLine) . ")$2\n";
    }
    else {
        print $out ("$line");
    }
}

close($in);
close($out);
