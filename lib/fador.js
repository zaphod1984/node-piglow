/*
this is a proposal for animations

modules to use:

chainsaw



var anim = fador().set(i1)
        .fade.after('2s').in('100ms').to(i2)
        .fade.after('2s').in('100ms').to(i3)
        .loop;

anim.start();
anim.stop();

fador().set(i1)
        .set.after(2).to(i2)
        .set.after(2).to(i3)
        .repeat(3)
        .start(function() {
            console.log('i looped 3 times');
        });

*/